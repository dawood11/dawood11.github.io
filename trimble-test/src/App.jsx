import React, { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import { debounce } from 'lodash';
import { List } from 'react-virtualized';
import './index.css'; // Import the CSS file

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeData: [],
      selectedGroups: {},
      projectId: null,
      modelName: "Model",
      searchTerm: "", // State for search term
      showSubHeader: true, // State to control the visibility of the sub-header
      loading: false, // State for loading
      selectionMode: false, // State for selection mode
    };

    // Debounce the search change handler
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this), 300);
  }

  dotConnect = async () => {
    return await Extensions.connect(
      window.parent,
      (event) => {
        switch (event) {
          case "extension.command":
          case "extension.accessToken":
          case "extension.userSettingsChanged":
            break;
          default:
        }
      },
      30000
    );
  };

  getProjectId = async () => {
    const api = await this.dotConnect();
    const project = await api.project.getProject();
    this.setState({ projectId: project.id });
    return project.id;
  };

  getModelName = async () => {
    const api = await this.dotConnect();
    const viewer = api.viewer;
    const models = await viewer.getModels();
    if (models.length > 0) {
      this.setState({ modelName: models[0].name });
    }
  };

  getAttributeDataFromTrimble = async () => {
    this.setState({ loading: true }); // Start loading

    const posAttributes = ["Pos.nr.", "Pos.nr", "Pos nr.", "Pos"];

    const api = await this.dotConnect();
    await this.getProjectId();
    await this.getModelName();

    const viewerObjects = await api.viewer.getObjects();

    const attributeObjects = [];
    const batchSize = 1000;

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);

      for (let i = 0; i < modelObjectIdsList.length; i += batchSize) {
        const batch = modelObjectIdsList.slice(i, i + batchSize);
        const properties = await api.viewer.getObjectProperties(modelId, batch);

        properties.forEach((propertySet) => {
          if (propertySet.properties) {
            let primaryAttribute = null;

            propertySet.properties.forEach((prop) => {
              prop.properties.forEach((subProp) => {
                if (posAttributes.some(attr => subProp.name.includes(attr))) {
                  primaryAttribute = { 
                    modelId, 
                    id: propertySet.id, 
                    class: propertySet.class, 
                    name: subProp.name,
                    value: subProp.value 
                  };
                }
              });
            });

            if (primaryAttribute) {
              attributeObjects.push({ ...primaryAttribute });
            }
          }
        });
      }
    }

    // Ensure loading is shown for at least 2 seconds
    setTimeout(() => {
      this.setState({ attributeData: attributeObjects, loading: false });
    }, 2000);
  };

  handleGroupClick = async (value) => {
    this.setState((prevState) => {
      const updatedGroups = { ...prevState.selectedGroups };
      if (updatedGroups[value]) {
        delete updatedGroups[value];
      } else {
        updatedGroups[value] = true;
      }

      return { selectedGroups: updatedGroups };
    }, async () => {
      if (this.state.selectionMode) {
        await this.selectModelsInViewer();
      } else {
        const api = await this.dotConnect();
        const selectedData = this.state.attributeData.filter(obj => this.state.selectedGroups[obj.value]);
        if (Object.keys(this.state.selectedGroups).length > 0) {
          await this.selectObjects(api, selectedData);
        }
      }
    });
  };

  selectObjects = async (api, objects) => {
    const modelEntities = objects.reduce((acc, obj) => {
      const model = acc.find(m => m.modelId === obj.modelId);
      if (model) {
        model.entityIds.push(obj.id);
      } else {
        acc.push({ modelId: obj.modelId, entityIds: [obj.id] });
      }
      return acc;
    }, []);

    // Isolate the selected objects (default behavior)
    await api.viewer.isolateEntities(modelEntities);
  };

  // Function to select models based on selected Pos.nr (filtered attribute cards)
  selectModelsInViewer = async () => {
    this.setState({ loading: true });

    const api = await this.dotConnect();
    const modelsToSelect = [];

    this.state.attributeData.forEach(obj => {
      if (this.state.selectedGroups[obj.value]) {
        modelsToSelect.push({ modelId: obj.modelId, objectRuntimeIds: [obj.id] });
      }
    });

    const batchSize = 500; // Adjust batch size based on model size and performance
    for (let i = 0; i < modelsToSelect.length; i += batchSize) {
      const batch = modelsToSelect.slice(i, i + batchSize);
      const objectSelector = {
        modelObjectIds: batch.map(m => ({
          modelId: m.modelId, objectRuntimeIds: m.objectRuntimeIds
        }))
      };

      // Apply selection for the current batch
      await api.viewer.setSelection(objectSelector);
    }

    this.setState({ loading: false });
  };

  toggleSelectionMode = () => {
    this.setState((prevState) => ({
      selectionMode: !prevState.selectionMode,
    }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  // Function to normalize strings for flexible searching
  normalizeString = (str) => {
    return str
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, '') // Remove spaces
      .replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
  };

  groupAttributeData = (data = this.state.attributeData) => {
    // Normalize the search term
    const normalizedSearchTerm = this.normalizeString(this.state.searchTerm);

    // Filter based on normalized search term
    const filteredData = data.filter((obj) => {
      const normalizedValue = this.normalizeString(obj.value);
      return normalizedValue.includes(normalizedSearchTerm);
    });

    const sortedData = this.sortAttributeData(filteredData);

    const groupedData = sortedData.reduce((acc, obj) => {
      const { value } = obj;
      if (!acc[value]) {
        acc[value] = { value, antall: 0, models: [] };
      }
      acc[value].antall += 1;
      acc[value].models.push(obj);
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  // Function to sort attribute data by letters + numbers (e.g., A1, B2, etc.)
  sortAttributeData = (data) => {
    return data.sort((a, b) => {
      const regex = /(\D+)(\d+)/;
      const aMatch = a.value.match(regex);
      const bMatch = b.value.match(regex);

      if (aMatch && bMatch) {
        if (aMatch[1] === bMatch[1]) {
          return parseInt(aMatch[2]) - parseInt(bMatch[2]);
        } else {
          return aMatch[1].localeCompare(bMatch[1]);
        }
      }

      return a.value.localeCompare(b.value);
    });
  };

  renderGroupedAttributeObjects = () => {
    const groupedData = this.groupAttributeData();

    return (
      <List
        width={300}
        height={600}
        rowCount={groupedData.length}
        rowHeight={100}
        rowRenderer={({ index, key, style }) => {
          const group = groupedData[index];
          return (
            <div
              key={key}
              style={style}
              className={`attribute-card ${this.state.selectedGroups[group.value] ? 'selected' : ''}`}
              onClick={() => this.handleGroupClick(group.value)}
            >
              <strong>{group.value}</strong><br />
              Antall: {group.antall}
            </div>
          );
        }}
      />
    );
  };

  render() {
    return (
      <>
        <div className="container">
          <header className="header">
            <div className="header-content">
              <div className="logo">
                <h1>
                  <span className="pos">POS.</span>
                  <span className="flow">Flow</span>
                </h1>
              </div>
              <nav>
                <a href="#" onClick={this.getAttributeDataFromTrimble}>
                  <img src="https://dawood11.github.io/trimble-test/src/assets/power-button.png" alt="Start" className="nav-icon" />
                </a>
                {/* M button to toggle selection mode */}
                <a href="#" onClick={this.toggleSelectionMode}>
                  {this.state.selectionMode ? (
                    <img
                      src="https://dawood11.github.io/trimble-test/src/assets/M.png"
                      alt="Selection Mode"
                      className="nav-icon"
                    />
                  ) : (
                    <img
                      src="https://dawood11.github.io/trimble-test/src/assets/MN.png"
                      alt="Selection Mode"
                      className="nav-icon"
                    />
                  )}
                </a>
              </nav>
            </div>
          </header>

          {/* Sub-header section */}
          <div className="sub-header">
            <input
              type="text"
              className="input-field"
              placeholder="Søk"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
            />
          </div>

          <main className="content">
            {this.state.loading ? (
              <div className="loading-message">
                Leser armeringen, vennligst vent...
              </div>
            ) : (
              this.renderGroupedAttributeObjects()
            )}
          </main>
          <footer>
            <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo"/>
            <p>Utviklet av Yasin Rafiq</p>
            <p>Beta 1.8.1</p>
          </footer>
        </div>
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
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
      application: null, // State to store application type
    };
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
    let isTekla = false; // Flag to check if Tekla Structures is detected

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);

      for (let i = 0; i < modelObjectIdsList.length; i += 1000) {
        const batch = modelObjectIdsList.slice(i, i + 1000);
        const properties = await api.viewer.getObjectProperties(modelId, batch);

        properties.forEach((propertySet) => {
          if (propertySet.properties) {
            let primaryAttribute = null;

            propertySet.properties.forEach((prop) => {
              prop.properties.forEach((subProp) => {
                // Debugging log to see if Application attribute is found
                console.log(`Checking property: ${subProp.name} with value: ${subProp.value}`);

                // Check if the Application attribute contains Tekla Structures
                if (subProp.name === "Application" && subProp.value.includes("Tekla Structures")) {
                  isTekla = true; // Set flag if Tekla Structures is found
                  console.log("Tekla Structures detected!"); // Debugging log
                }

                // Check for position-related attributes
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

    // Set the state based on whether Tekla Structures was detected
    this.setState({ attributeData: attributeObjects, application: isTekla ? "Tekla" : null, loading: false }, () => {
      console.log(`Application set to: ${this.state.application}`); // Debugging log to confirm state update
    });
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
    const api = await this.dotConnect();
    const modelsToSelect = [];

    // Only select the objects that match selected Pos.nr values
    this.state.attributeData.forEach(obj => {
      if (this.state.selectedGroups[obj.value]) {
        modelsToSelect.push({ modelId: obj.modelId, objectRuntimeIds: [obj.id] });
      }
    });

    if (modelsToSelect.length > 0) {
      const objectSelector = {
        modelObjectIds: modelsToSelect.map(m => ({
          modelId: m.modelId, objectRuntimeIds: m.objectRuntimeIds
        }))
      };

      // Apply selection based on selected Pos.nr only
      await api.viewer.setSelection(objectSelector);
    }
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
    const selectedData = groupedData.filter(group => this.state.selectedGroups[group.value]);
    const nonSelectedData = groupedData.filter(group => !this.state.selectedGroups[group.value]);

    // Determine label based on application type
    const label = this.state.application === "Tekla" ? "Antall grupper" : "Antall";

    return (
      <div className="attribute-cards">
        {selectedData.map(group => (
          <div 
            key={group.value} 
            className="attribute-card selected"
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            {label}: {group.antall}
          </div>
        ))}
        {selectedData.length > 0 && <hr className="separator" />}
        {nonSelectedData.map(group => (
          <div 
            key={group.value} 
            className="attribute-card"
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            {label}: {group.antall}
          </div>
        ))}
      </div>
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
            <p>Beta 1.8</p>
          </footer>
        </div>
      </>
    );
  }
}

export default App;

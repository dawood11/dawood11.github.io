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
      ghostMode: false,
      searchTerm: "",
      showSubHeader: true,
      loading: false,
      selectionMode: false, // New state for selection mode
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
    this.setState({ loading: true });

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

    setTimeout(() => {
      this.setState({ attributeData: attributeObjects, loading: false });
    }, 2000);
  };

  handleGroupClick = async (value) => {
    const api = await this.dotConnect();
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
      }
    });
  };

  // Function to select models without isolating
  selectModelsInViewer = async () => {
    const api = await this.dotConnect();
    const modelsToSelect = [];

    // Loop through attribute data and add selected models to the list
    this.state.attributeData.forEach((obj) => {
      if (this.state.selectedGroups[obj.value]) {
        modelsToSelect.push({ modelId: obj.modelId, objectRuntimeIds: [obj.id] });
      }
    });

    // Set selection in the viewer without isolating
    await api.viewer.setSelection({
      clear: true, // Clear previous selection
      models: modelsToSelect, // Select the new models
    });
  };

  toggleSelectionMode = () => {
    this.setState((prevState) => ({
      selectionMode: !prevState.selectionMode,
    }), async () => {
      if (this.state.selectionMode) {
        await this.selectModelsInViewer();
      }
    });
  };

  renderGroupedAttributeObjects = () => {
    const groupedData = this.groupAttributeData();
    const selectedData = groupedData.filter(group => this.state.selectedGroups[group.value]);
    const nonSelectedData = groupedData.filter(group => !this.state.selectedGroups[group.value]);

    return (
      <div className="attribute-cards">
        {selectedData.map(group => (
          <div 
            key={group.value} 
            className="attribute-card selected"
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
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
            Antall: {group.antall}
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
              <a href="#" onClick={this.toggleSelectionMode}>
                <img src="https://dawood11.github.io/trimble-test/src/assets/M.png" alt="Selection Mode" className="nav-icon" />
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
          <p>TEST</p>
        </footer>
        </div>
      </>
    );
  }
}

export default App;

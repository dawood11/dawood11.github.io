import React, { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeData: [],
      selectedGroups: {},
      projectId: null,
      modelName: "Model",
      searchTerm: "",
      showSubHeader: true,
      loading: false,
      selectionMode: false,
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

    await api.viewer.isolateEntities(modelEntities);
  };

  selectModelsInViewer = async () => {
    const api = await this.dotConnect();
    const modelsToSelect = [];

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

  normalizeString = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  groupAttributeData = (data = this.state.attributeData) => {
    const normalizedSearchTerm = this.normalizeString(this.state.searchTerm);

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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model/:modelName" element={<ModelDetail />} />
          <Route path="/newpage" element={<NewPage />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to POS Flow</h1>
      <p>Select a model to view details:</p>
      <nav>
        <Link to="/model/ExampleModel">View ExampleModel</Link>
        <Link to="/model/AnotherModel">View AnotherModel</Link>
      </nav>
    </div>
  );
};

const ModelDetail = () => {
  const { modelName } = useParams();

  return (
    <div className="model-detail-container">
      <h1>Model: {modelName}</h1>
      <p>Here you can display detailed information about the model {modelName}.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const NewPage = () => {
  return (
    <div className="new-page">
      <h1>This is the new page</h1>
      <p>Here is some content for the new page.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo" />
      <p>Utviklet av Yasin Rafiq</p>
      <p>Beta 1.8.1</p>

      <button onClick={() => navigate('/newpage')} className="footer-button">
        Go to New Page
      </button>
    </footer>
  );
};

export default App;

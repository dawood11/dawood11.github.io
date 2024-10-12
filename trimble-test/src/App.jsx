import React, { useState, useEffect, useCallback } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import './index.css';
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

const App = () => {
  useEffect(() => {
    // Load Modus Web Components
    defineCustomElements();
  }, []);

  const [attributeData, setAttributeData] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [modelName, setModelName] = useState('Model');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dotConnect = async () => {
    return await Extensions.connect(
      window.parent,
      (event) => {
        switch (event) {
          case 'extension.command':
          case 'extension.accessToken':
          case 'extension.userSettingsChanged':
            break;
          default:
        }
      },
      30000
    );
  };

  const getProjectId = async () => {
    const api = await dotConnect();
    const project = await api.project.getProject();
    setProjectId(project.id);
    return project.id;
  };

  const getModelName = async () => {
    const api = await dotConnect();
    const viewer = api.viewer;
    const models = await viewer.getModels();
    if (models.length > 0) {
      setModelName(models[0].name);
    }
  };

  const getAttributeDataFromTrimble = async () => {
    setLoading(true);

    const posAttributes = ['Pos.nr.', 'Pos.nr', 'Pos nr.', 'Pos'];
    const api = await dotConnect();
    await getProjectId();
    await getModelName();

    const viewerObjects = await api.viewer.getObjects();
    const attributeObjects = [];
    const batchSize = 1000;

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet['modelId'];
      let modelObjectIdsList = modelObjectsSet['objects'].map((obj) => obj.id);

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
      setAttributeData(attributeObjects);
      setLoading(false);
    }, 2000);
  };

  const handleGroupClick = async (value) => {
    setSelectedGroups((prevSelectedGroups) => {
      const updatedGroups = { ...prevSelectedGroups };
      if (updatedGroups[value]) {
        delete updatedGroups[value];
      } else {
        updatedGroups[value] = true;
      }
      return updatedGroups;
    });
  };

  const selectObjects = useCallback(async (api, objects) => {
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
  }, []);

  const selectModelsInViewer = useCallback(async (api, objects) => {
    const modelsToSelect = [];

    objects.forEach(obj => {
      if (selectedGroups[obj.value]) {
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
  }, [selectedGroups]);

  useEffect(() => {
    const updateSelection = async () => {
      const api = await dotConnect();
      const selectedData = attributeData.filter(obj => selectedGroups[obj.value]);
      if (selectionMode) {
        await selectModelsInViewer(api, selectedData);
      } else {
        if (Object.keys(selectedGroups).length > 0) {
          await selectObjects(api, selectedData);
        } else {
          if (Object.keys(selectedGroups).length === 0 && !selectionMode) {
            api.viewer.onModelReset(() => {
              console.log('Model reset triggered');
            });
          } // Properly reset the model when no attribute cards are selected and toggle is off
        }
      }
    };

    updateSelection();
  }, [selectedGroups, selectionMode, attributeData, selectModelsInViewer, selectObjects]);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  const groupAttributeData = (data = attributeData) => {
    const normalizedSearchTerm = normalizeString(searchTerm);

    const filteredData = data.filter((obj) => {
      const normalizedValue = normalizeString(obj.value);
      return normalizedValue.includes(normalizedSearchTerm);
    });

    const groupedData = filteredData.reduce((acc, obj) => {
      if (!acc[obj.id]) {
        acc[obj.id] = { id: obj.id, posNr: [] };
      }
      acc[obj.id].posNr.push(obj);
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  const renderContentTree = () => {
    const groupedData = groupAttributeData();

    return (
      <modus-content-tree multiSelection>
        {groupedData.map((group) => (
          <modus-content-tree-item key={group.id} label={`Object ID: ${group.id}`}>
            {group.posNr.map((pos) => (
              <modus-content-tree-item key={pos.value} label={`Pos.nr: ${pos.value}`} />
            ))}
          </modus-content-tree-item>
        ))}
      </modus-content-tree>
    );
  };

  // Example function that will trigger the alert
  const showTestAlert = () => {
    setShowAlert(true);
  };

  // Function to close the alert
  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
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
            <a href="#" onClick={getAttributeDataFromTrimble}>
              <img src="https://dawood11.github.io/trimble-test/src/assets/power-button.png" alt="Start" className="nav-icon" />
            </a>
            <a href="#" onClick={toggleSelectionMode}>
              <img
                src={selectionMode
                  ? 'https://dawood11.github.io/trimble-test/src/assets/M.png'
                  : 'https://dawood11.github.io/trimble-test/src/assets/MN.png'}
                alt="Selection Mode"
                className="nav-icon"
              />
            </a>
            <a href="#" onClick={showTestAlert}>
              Show Alert
            </a>
          </nav>
        </div>
      </header>

      <div className="sub-header">
        <input
          type="text"
          className="input-field"
          placeholder="Søk"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <main className="content">
        {loading ? (
          <div className="loading-message">Leser armeringen, vennligst vent...</div>
        ) : (
          renderContentTree()
        )}
      </main>

      {/* Modus Alert Component */}
      {showAlert && (
        <modus-alert
          type="info"
          message="This is an informational alert."
          dismissible
          onDismiss={handleAlertDismiss}
        ></modus-alert>
      )}

      <footer>
        <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo" />
        <p>Utviklet av Yasin Rafiq</p>
        <p>UTVIKLING 0.3.5</p>
      </footer>
    </div>
  );
};

export default App;
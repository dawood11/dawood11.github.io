import React, { useState, useEffect, useMemo } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import './index.css'; 
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

const App = () => {
  useEffect(() => {
    defineCustomElements();
  }, []);

  const [attributeData, setAttributeData] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [modelName, setModelName] = useState('Model');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);

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
                if (posAttributes.some((attr) => subProp.name.includes(attr))) {
                  primaryAttribute = {
                    modelId,
                    id: propertySet.id,
                    class: propertySet.class,
                    name: subProp.name,
                    value: subProp.value,
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

    setAttributeData(attributeObjects);
    setLoading(false);
  };

  const handleGroupClick = async (value) => {
    setSelectedGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
      if (updatedGroups[value]) {
        delete updatedGroups[value];
      } else {
        updatedGroups[value] = true;
      }
      return updatedGroups;
    });

    if (selectionMode) {
      await selectModelsInViewer();
    } else {
      const api = await dotConnect();
      const selectedData = attributeData.filter((obj) => selectedGroups[obj.value]);
      if (Object.keys(selectedGroups).length > 0) {
        await selectObjects(api, selectedData);
      }
    }
  };

  const selectObjects = async (api, objects) => {
    const modelEntities = objects.reduce((acc, obj) => {
      const model = acc.find((m) => m.modelId === obj.modelId);
      if (model) {
        model.entityIds.push(obj.id);
      } else {
        acc.push({ modelId: obj.modelId, entityIds: [obj.id] });
      }
      return acc;
    }, []);

    await api.viewer.isolateEntities(modelEntities);
  };

  const selectModelsInViewer = async () => {
    const api = await dotConnect();
    const modelsToSelect = [];

    attributeData.forEach((obj) => {
      if (selectedGroups[obj.value]) {
        modelsToSelect.push({ modelId: obj.modelId, objectRuntimeIds: [obj.id] });
      }
    });

    if (modelsToSelect.length > 0) {
      const objectSelector = {
        modelObjectIds: modelsToSelect.map((m) => ({
          modelId: m.modelId,
          objectRuntimeIds: m.objectRuntimeIds,
        })),
      };

      await api.viewer.setSelection(objectSelector);
    }
  };

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

  const groupAttributeData = () => {
    const normalizedSearchTerm = normalizeString(searchTerm);

    const filteredData = attributeData.filter((obj) => {
      const normalizedValue = normalizeString(obj.value);
      return normalizedValue.includes(normalizedSearchTerm);
    });

    const sortedData = sortAttributeData(filteredData);

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

  const sortAttributeData = (data) => {
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

  const renderGroupedAttributeObjects = () => {
    const groupedData = groupAttributeData();
    const selectedData = groupedData.filter((group) => selectedGroups[group.value]);
    const nonSelectedData = groupedData.filter((group) => !selectedGroups[group.value]);

    return (
      <div className="attribute-cards">
        {selectedData.map((group) => (
          <div
            key={group.value}
            className="attribute-card selected"
            onClick={() => handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong>
            <br />
            Antall: {group.antall}
          </div>
        ))}
        {selectedData.length > 0 && <hr className="separator" />}
        {nonSelectedData.map((group) => (
          <div key={group.value} className="attribute-card" onClick={() => handleGroupClick(group.value)}>
            <strong>{group.value}</strong>
            <br />
            Antall: {group.antall}
          </div>
        ))}
      </div>
    );
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
          renderGroupedAttributeObjects()
        )}
      </main>

      <footer>
        <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo" />
        <p>Utviklet av Yasin Rafiq</p>
        <p>UTVIKLING 0.02</p>
      </footer>
    </div>
  );
};

export default App;

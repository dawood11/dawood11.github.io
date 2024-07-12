import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");
  const [selectedGroups, setSelectedGroups] = useState({});

  async function dotConnect() {
    return await Extensions.connect(
      window.parent,
      (event, args) => {
        switch (event) {
          case "extension.command":
            break;
          case "extension.accessToken":
            break;
          case "extension.userSettingsChanged":
            break;
          default:
        }
      },
      30000
    );
  }

  async function getAttributeDataFromTrimble() {
    console.log("GET ATTRIBUTE DATA");
    const api = await dotConnect();
    const viewerObjects = await api.viewer.getObjects();
    const attributeObjects = [];

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      const modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);

      const properties = await api.viewer.getObjectProperties(modelId, modelObjectIdsList);
      properties.forEach((propertySet) => {
        if (propertySet.properties) {
          propertySet.properties.forEach((prop) => {
            if (prop.name === psetName.replace("Example: ", "")) {
              const additionalValues = {};
              prop.properties.forEach((subProp) => {
                if (subProp.name === attribute.replace("Example: ", "")) {
                  // Check for diameter and dimensions
                  prop.properties.forEach((dimProp) => {
                    if (["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"].includes(dimProp.name)) {
                      additionalValues[dimProp.name] = dimProp.value;
                    }
                  });

                  attributeObjects.push({
                    modelId,
                    id: propertySet.id,
                    class: propertySet.class,
                    value: subProp.value,
                    additionalValues
                  });
                }
              });
            }
          });
        }
      });
    }

    setAttributeData(attributeObjects);
  }

  const handleGroupCheckboxChange = async (value, isChecked) => {
    const api = await dotConnect();
    setSelectedGroups((prevSelectedGroups) => ({
      ...prevSelectedGroups,
      [value]: isChecked
    }));

    const selectedData = attributeData.filter(obj => obj.value === value);
    if (isChecked) {
      await selectObjects(api, selectedData);
    } else {
      await deselectObjects(api, selectedData);
    }
  };

  const selectObjects = async (api, objects) => {
    const objectSelector = {
      modelObjectIds: objects.map(obj => ({
        modelId: obj.modelId,
        objectRuntimeIds: [obj.id]
      }))
    };
    await api.viewer.setSelection(objectSelector, "add");
  };

  const deselectObjects = async (api, objects) => {
    const objectSelector = {
      modelObjectIds: objects.map(obj => ({
        modelId: obj.modelId,
        objectRuntimeIds: [obj.id]
      }))
    };
    await api.viewer.setSelection(objectSelector, "remove");
  };

  const renderGroupedAttributeObjects = () => {
    const groupedData = groupAttributeData(attributeData);
    if (groupedData.length === 0) return <p>No data available.</p>;

    return (
      <div>
        {groupedData.map(group => (
          <div key={group.value}>
            <input
              type="checkbox"
              checked={selectedGroups[group.value]}
              onChange={(e) => handleGroupCheckboxChange(group.value, e.target.checked)}
            />
            <label>
              {attribute}: {group.value} ({group.count})
              <div>
                {Object.entries(group.models[0].additionalValues).map(([key, val]) => (
                  <p key={key}>{key}: {val}</p>
                ))}
              </div>
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>Tatta 38</h1>
        </header>
        <div className="content">
          <div>
            <label>
              PSET NAME:
              <input type="text" value={psetName} onChange={(e) => setPsetName(e.target.value)} />
            </label>
            <br />
            <label>
              ATTRIBUTE:
              <input type="text" value={attribute} onChange={(e) => setAttribute(e.target.value)} />
            </label>
          </div>
          <button onClick={getAttributeDataFromTrimble}>Generate</button>
          {renderGroupedAttributeObjects()}
        </div>
      </div>
    </>
  );
}

export default App;

function groupAttributeData(data) {
  return data.reduce((acc, obj) => {
    if (!acc[obj.value]) {
      acc[obj.value] = {
        value: obj.value,
        count: 0,
        models: [obj]
      };
    } else {
      acc[obj.value].count++;
      acc[obj.value].models.push(obj);
    }
    return acc;
  }, {});
}

import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Ensure your CSS is linked

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
    console.log("viewerObjects: ", viewerObjects);

    const attributeObjects = [];

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);
      console.log("Fetching properties for model ID:", modelId);

      const properties = await api.viewer.getObjectProperties(modelId, modelObjectIdsList);
      console.log("Fetched properties:", properties);

      properties.forEach((propertySet) => {
        if (propertySet.properties) {
          propertySet.properties.forEach((prop) => {
            if (prop.name === psetName.replace("Example: ", "")) {
              prop.properties.forEach((subProp) => {
                if (subProp.name === attribute.replace("Example: ", "")) {
                  attributeObjects.push({ modelId, id: propertySet.id, class: propertySet.class, value: subProp.value });
                }
              });
            }
          });
        }
      });
    }

    setAttributeData(attributeObjects);
    console.log("Attribute Objects: ", attributeObjects);
  }

  const handleGroupCheckboxChange = async (value, isChecked) => {
    const api = await dotConnect();
    setSelectedGroups(prev => ({ ...prev, [value]: isChecked }));

    const selectedData = attributeData.filter(obj => obj.value === value);
    if (isChecked) {
      await selectObjects(api, selectedData);
    } else {
      await deselectObjects(api, selectedData);
    }
  };

  const selectObjects = async (api, objects) => {
    const selectionPromises = objects.map(obj => api.viewer.setSelection({ modelObjectIds: [{ modelId: obj.modelId, objectRuntimeIds: [obj.id] }] }, "add"));
    await Promise.all(selectionPromises);
    console.log(`Objects selected.`);
  };

  const deselectObjects = async (api, objects) => {
    const deselectionPromises = objects.map(obj => api.viewer.setSelection({ modelObjectIds: [{ modelId: obj.modelId, objectRuntimeIds: [obj.id] }] }, "remove"));
    await Promise.all(deselectionPromises);
    console.log(`Objects deselected.`);
  };

  const renderGroupedAttributeObjects = () => {
    const groupedData = attributeData.reduce((acc, obj) => {
      acc[obj.value] = acc[obj.value] || { value: obj.value, count: 0, models: [] };
      acc[obj.value].count++;
      acc[obj.value].models.push(obj);
      return acc;
    }, {});

    return (
      <div>
        {Object.values(groupedData).map(group => (
          <div key={group.value}>
            <input
              type="checkbox"
              checked={!!selectedGroups[group.value]}
              onChange={(e) => handleGroupCheckboxChange(group.value, e.target.checked)}
            />
            <label>{group.value} ({group.count})</label>
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
              <input
                type="text"
                value={psetName}
                onChange={(e) => setPsetName(e.target.value)}
              />
            </label>
            <br />
            <label>
              ATTRIBUTE:
              <input
                type="text"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
              />
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

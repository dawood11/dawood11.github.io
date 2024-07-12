import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Ensure this is linked to the updated styles

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("");
  const [attribute, setAttribute] = useState("");
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

  async function fetchAttributeData() {
    console.log("Fetching Attribute Data");
    const api = await dotConnect();
    const viewerObjects = await api.viewer.getObjects();
    console.log("Viewer Objects: ", viewerObjects);

    const attributeObjects = [];

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      const objectIds = modelObjectsSet["objects"].map((obj) => obj.id);

      const properties = await api.viewer.getObjectProperties(modelId, objectIds);
      console.log("Properties:", properties);

      properties.forEach(propertySet => {
        propertySet.properties.forEach(prop => {
          prop.properties.forEach(subProp => {
            if (subProp.name === attribute && prop.name === psetName) {
              attributeObjects.push({
                modelId,
                objectId: propertySet.id,
                class: propertySet.class,
                value: subProp.value
              });
            }
          });
        });
      });
    }

    setAttributeData(attributeObjects);
    console.log("Attribute Objects: ", attributeObjects);
  }

  const handleSelectionChange = async (value, isSelected) => {
    const api = await dotConnect();
    const relevantData = attributeData.filter(item => item.value === value);
    const modelEntities = relevantData.map(item => ({
      modelId: item.modelId,
      objectRuntimeIds: [item.objectId]
    }));

    if (isSelected) {
      await api.viewer.setSelection({ modelObjectIds: modelEntities }, "add");
    } else {
      await api.viewer.setSelection({ modelObjectIds: modelEntities }, "remove");
    }
  };

  const renderAttributeBlocks = () => {
    const groupedData = attributeData.reduce((acc, item) => {
      acc[item.value] = acc[item.value] || { value: item.value, count: 0, items: [] };
      acc[item.value].count++;
      acc[item.value].items.push(item);
      return acc;
    }, {});

    return Object.values(groupedData).map(group => (
      <div key={group.value} className="attribute-block">
        <input
          type="checkbox"
          checked={selectedGroups[group.value] || false}
          onChange={e => handleSelectionChange(group.value, e.target.checked)}
        />
        <label>{group.value} ({group.count})</label>
      </div>
    ));
  };

  return (
    <div className="app-container">
      <nav className="app-navbar">
        <h1>POS.Flow</h1>
        <div>
          <button onClick={fetchAttributeData}>Start</button>
          <button onClick={() => {}}>Lag Visning</button>
          <button onClick={() => {}}>Generer</button>
        </div>
      </nav>
      <main className="main-content">
        <input
          type="text"
          placeholder="Legg inn PSET"
          value={psetName}
          onChange={e => setPsetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Legg inn attributt"
          value={attribute}
          onChange={e => setAttribute(e.target.value)}
        />
        {renderAttributeBlocks()}
      </main>
    </div>
  );
}

export default App;

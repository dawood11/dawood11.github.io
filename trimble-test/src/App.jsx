import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file for styling

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
    const api = await dotConnect();
    const viewerObjects = await api.viewer.getObjects();

    const attributeObjects = [];

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      const objectIds = modelObjectsSet["objects"].map((obj) => obj.id);
      const properties = await api.viewer.getObjectProperties(modelId, objectIds);

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
  }

  return (
    <div className="app-container">
      <nav className="app-navbar">
        <div className="navbar-content">
          <h1 className="title">POS.Flow 1</h1>
          <div className="navbar-buttons">
            <button onClick={fetchAttributeData}>Start</button>
            <button onClick={() => {}}>Lag Visning</button>
            <button onClick={() => {}}>Generer</button>
          </div>
        </div>
        <div className="input-fields">
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
        </div>
      </nav>
      <main className="main-content">
        {/* Content that shows attribute data would go here */}
      </main>
    </div>
  );
}

export default App;

import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Ensure your CSS file is correctly linked

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("");
  const [attribute, setAttribute] = useState("");
  const [selectedGroups, setSelectedGroups] = useState({});

  // Establish a connection to the Trimble Connect API
  async function dotConnect() {
    return Extensions.connect(
      window.parent,
      (event, args) => {
        console.log("Event received:", event); // Debugging line to check events
      },
      30000 // Timeout after 30000 milliseconds
    );
  }

  // Fetch attributes based on the PSET and attribute inputs
  async function fetchAttributeData() {
    try {
      const api = await dotConnect();
      const viewerObjects = await api.viewer.getObjects();
      console.log("Viewer Objects:", viewerObjects); // Debug output

      const attributeObjects = [];

      for (const modelObjectsSet of viewerObjects) {
        const modelId = modelObjectsSet["modelId"];
        const objectIds = modelObjectsSet["objects"].map(obj => obj.id);

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
      console.log("Attribute Objects:", attributeObjects); // Debug output
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  // Render function for displaying grouped attribute data
  const renderAttributeBlocks = () => {
    if (!attributeData.length) {
      return <p>No data available. Please generate data.</p>;
    }

    const groupedData = attributeData.reduce((acc, item) => {
      acc[item.value] = acc[item.value] || { value: item.value, count: 0, items: [] };
      acc[item.value].count++;
      acc[item.value].items.push(item);
      return acc;
    }, {});

    return Object.values(groupedData).map(group => (
      <div key={group.value} onClick={() => handleSelectionChange(group.value)}>
        {group.value} ({group.count})
      </div>
    ));
  };

  return (
    <div className="app-container">
      <nav className="app-navbar">
        <h1>POS.Flow 2</h1>
        <div>
          <button onClick={fetchAttributeData}>Start</button>
          <button>Lag Visning</button>
          <button>Generer</button>
        </div>
      </nav>
      <div className="input-fields">
        <input type="text" placeholder="Legg inn PSET" value={psetName} onChange={e => setPsetName(e.target.value)} />
        <input type="text" placeholder="Legg inn attributt" value={attribute} onChange={e => setAttribute(e.target.value)} />
      </div>
      <main className="main-content">
        {renderAttributeBlocks()}
      </main>
    </div>
  );
}

export default App;

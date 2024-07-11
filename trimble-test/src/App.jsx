import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");

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
    await dotConnect().then(async (WorkspaceAPI) => {
      const api = await WorkspaceAPI;
      console.log("api: ", api);

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
                    attributeObjects.push({ value: subProp.value });
                  }
                });
              }
            });
          }
        });
      }

      setAttributeData(attributeObjects);
      console.log("Attribute Objects: ", attributeObjects);
    });
  }

  const groupAttributeData = () => {
    const groupedData = attributeData.reduce((acc, obj) => {
      const { value } = obj;
      if (!acc[value]) {
        acc[value] = { value, count: 0 };
      }
      acc[value].count += 1;
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  const renderGroupedAttributeObjects = () => {
    const groupedData = groupAttributeData();
    if (groupedData.length === 0) return <p>No data available.</p>;

    return (
      <div>
        {groupedData.map(group => (
          <div key={group.value}>
            <p>
              {attribute}: {group.value} <br />
              Count: {group.count}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>Tatta 11</h1>
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

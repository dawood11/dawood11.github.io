import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [projectData, setProjectData] = useState(null);
  const [mmiData, setMmiData] = useState([]);

  async function dotConnect() {
    return await Extensions.connect(
      window.parent,
      (event, args) => {
        switch (event) {
          case "extension.command":
            // "Command executed by the user: args.data"
            break;
          case "extension.accessToken":
            // "Access token or status: args.data"
            break;
          case "extension.userSettingsChanged":
            // "User settings changed!"
            break;
          default:
        }
      },
      30000
    );
  }

  async function getCurrentProjectFromTrimble() {
    console.log("GET PROJECT INFOOOO");
    await dotConnect().then(async (WorkspaceAPI) => {
      const data = await WorkspaceAPI.project.getCurrentProject();
      console.log(data);
      setProjectData(data);
    });
  }

  async function getMMIObjectsFromTrimble() {
    console.log("GET MMI OBJECTS");
    await dotConnect().then(async (WorkspaceAPI) => {
      const api = await WorkspaceAPI;
      console.log("api: ", api);

      const viewerObjects = await api.viewer.getObjects();
      console.log("viewerObjects: ", viewerObjects);

      const mmiObjects = [];

      for (const modelObjectsSet of viewerObjects) {
        const modelId = modelObjectsSet["modelId"];
        let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);
        console.log("Fetching properties for model ID:", modelId);

        const properties = await api.viewer.getObjectProperties(modelId, modelObjectIdsList);
        console.log("Fetched properties:", properties);

        properties.forEach((propertySet) => {
          if (propertySet.properties) {
            propertySet.properties.forEach((prop) => {
              if (prop.name === 'A22 MMI') {
                console.log("Found MMI property:", prop);
                mmiObjects.push({ id: propertySet.id, class: propertySet.class, mmi: prop.value });
              }
            });
          }
        });
      }

      setMmiData(mmiObjects);
      console.log("MMI Objects: ", mmiObjects);
    });
  }

  const getMMIColor = (mmi) => {
    switch (mmi) {
      case 100:
        return 'red';
      case 200:
        return 'orange';
      case 300:
        return 'yellow';
      case 350:
        return 'lightgreen';
      case 400:
        return 'green';
      case 500:
        return 'blue';
      default:
        return 'grey';
    }
  };

  const renderMMIObjects = () => {
    if (!mmiData || mmiData.length === 0) return <p>No MMI data available.</p>;

    return (
      <div>
        {mmiData.map(obj => (
          <div key={obj.id} style={{ color: getMMIColor(obj.mmi) }}>
            <p>
              ID: {obj.id} <br />
              Class: {obj.class} <br />
              MMI: {obj.mmi} <br />
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
          <h1>Tatta 1</h1>
        </header>
        <div className="content">
          <button onClick={getCurrentProjectFromTrimble}>Get Project Info</button>
          <button onClick={getMMIObjectsFromTrimble}>Get MMI Objects</button>
          {projectData && (
            <div>
              <h2>Project Information</h2>
              <p>
                Project ID: {projectData.id} <br />
                Project Name: {projectData.name} <br />
                Project Location: {projectData.location} <br />
                Project Address: {projectData.address} <br />
              </p>
            </div>
          )}
          {renderMMIObjects()}
        </div>
      </div>
    </>
  );
}

export default App;

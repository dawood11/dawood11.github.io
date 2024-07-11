import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [projectData, setProjectData] = useState(null);
  const [mmiData, setMmiData] = useState(null);

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

      if (data !== null && data !== undefined) {
        const api = await WorkspaceAPI;
        console.log("api: ", api);
        await WorkspaceAPI.viewer.getObjects().then((viewerObjects) => {
          console.log("viewerObjects: ", viewerObjects);
          viewerObjects.forEach(async (modelObjectsSet) => {
            console.log("modelObjectsSet: ", modelObjectsSet);

            const modelId = modelObjectsSet["modelId"];
            console.log("modelID: ", modelId);
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.log([modelObjectsSet["modelId"]]);
            console.log([modelObjectsSet["objects"]]); //////
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

            let modelObjectIdsList = [];
            modelObjectsSet["objects"].forEach((modelObject) => {
              modelObjectIdsList.push(modelObject.id);
            });
            console.log("modelObjectIdsList", modelObjectIdsList);
            const properties = await WorkspaceAPI.viewer
              .getObjectProperties(modelId, modelObjectIdsList)
              .then((objectProperties) => {
                return objectProperties;
              })
              .catch((err) => {
                console.log("catch: ", err);
              });
            console.log("PROPERTIES!!: ", properties);

            await WorkspaceAPI.viewer
              .setSelection(
                { modelObjectIds: modelObjectsSet, selected: true },
                "add"
              )
              .then((response) => {
                console.log("response: ", response);
              })
              .catch((err) => {
                console.log("res catch: ", err);
              });
          });
        });
        console.log("----------------------------------------------------");
      }
    });
  }

  async function getMMIObjectsFromTrimble() {
    console.log("GET MMI OBJECTS");
    await dotConnect().then(async (WorkspaceAPI) => {
      const api = await WorkspaceAPI;
      console.log("api: ", api);
      await WorkspaceAPI.viewer.getObjects().then((viewerObjects) => {
        console.log("viewerObjects: ", viewerObjects);
        const mmiObjects = viewerObjects.flatMap(modelObjectsSet => {
          return modelObjectsSet.objects.flatMap(obj => {
            const properties = obj.properties || [];
            return properties
              .filter(prop => prop.name === 'A22 MMI')
              .map(prop => ({ ...obj, mmi: prop.value }));
          });
        });

        setMmiData(mmiObjects);
        console.log("MMI Objects: ", mmiObjects);
      });
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
    if (!mmiData) return null;

    return (
      <div>
        {mmiData.map(obj => (
          <div key={obj.id} style={{ color: getMMIColor(obj.mmi) }}>
            <p>
              ID: {obj.id} <br />
              Class: {obj.class} <br />
              MMI: {obj.mmi} <br />
              Product: {obj.product.name} <br />
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
          <h1>TC Proto 1</h1>
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

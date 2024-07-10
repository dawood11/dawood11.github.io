import "./App.css";

import * as Extensions from "trimble-connect-project-workspace-api";

import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  async function dotConnect() {
    return await Extensions.connect(
      window.parent,
      (event, args) => {
        switch (event) {
          case "extension.command":
            //"Command executed by the user: args.data"
            break;
          case "extension.accessToken":
            //"Accestoken or status: args.data"
            break;
          case "extension.userSettingsChanged":
            //"User settings changed!"
            break;
          default:
        }
      },
      30000
    );
  }

  async function getCurrentProjectFromTrimple() {
    console.log("GET PROJECT INFOOOO");
    await dotConnect().then(async (WorkspaceAPI) => {
      const data = await WorkspaceAPI.project.getCurrentProject();
      console.log(data);
      if (data !== null || data !== undefined) {
        setId(data.id);
        setLocation(data.location);
        setName(data.name);
        setAddress(data.address);
      }
      const api = await WorkspaceAPI;
      console.log("api: ", api);
      await WorkspaceAPI.viewer.getObjects().then((viewerObjects) => {
        console.log("viewerObjects: ", viewerObjects);
        viewerObjects.forEach((modelObjectsSet) => {
          console.log("modelObjectsSet: ", modelObjectsSet);

          const modelId = modelObjectsSet["modelId"];
          console.log("modelID: ", modelId);
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          console.log([modelObjectsSet["modelId"]])
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

          modelObjectsSet["objects"].forEach((modelObject) => {
            console.log("modelObject: ", modelObject);
            WorkspaceAPI.viewer
              .getObjectProperties(modelId, [modelObjectsSet["modelId"]])
              .then((objectProperties) => {
                console.log("objectProps:");
                console.log(objectProperties);
              })
              .catch((err) => {
                console.logg("catch: ", err);
              });
          });
        });
      });
      // });      console.log("viewer: ", viewer)
      console.log("----------------------------------------------------");
    });
  }

  return (
    <>
      <div>
        <button onClick={getCurrentProjectFromTrimple}>
          click me project info!!
        </button>
        <div className="App">
          <h1>Hei på deg 4</h1>
          <p>
            Project ID: {id} <br />
            Project Name: {name} <br />
            Project Location: {location} <br />
            Project Address: {address} <br />
          </p>
        </div>
      </div>
    </>
  );
}

export default App;

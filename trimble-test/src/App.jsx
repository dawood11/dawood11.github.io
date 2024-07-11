import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [projectData, setProjectData] = useState(null);

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
        const viewerObjects = await WorkspaceAPI.viewer.getObjects();
        console.log("viewerObjects: ", viewerObjects);
        
        const processedData = viewerObjects.map(modelObjectsSet => {
          const modelId = modelObjectsSet["modelId"];
          const objects = modelObjectsSet["objects"];
          return {
            modelId,
            objects: objects.map(obj => ({
              id: obj.id,
              class: obj.class,
              product: obj.product,
              properties: obj.properties,
              position: obj.position
            }))
          };
        });

        setProjectData({
          ...data,
          viewerObjects: processedData
        });

        console.log("Processed Data: ", processedData);
      }
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
    if (!projectData || !projectData.viewerObjects) return null;

    const mmiObjects = projectData.viewerObjects.flatMap(model =>
      model.objects.flatMap(obj =>
        (obj.properties || []) // Ensure properties exist
          .filter(prop => prop.name === 'A22 MMI')
          .map(prop => ({ ...obj, mmi: prop.value }))
      )
    );

    return (
      <div>
        {mmiObjects.map(obj => (
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
          <h1>Tatta2</h1>
        </header>
        <div className="content">
          <button onClick={getCurrentProjectFromTrimble}>Trykk her</button>
          {projectData && (
            <div>
              <h2>Project Information</h2>
              <p>
                Project ID: {projectData.id} <br />
                Project Name: {projectData.name} <br />
                Project Location: {projectData.location} <br />
                Project Address: {projectData.address} <br />
              </p>
              {renderMMIObjects()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

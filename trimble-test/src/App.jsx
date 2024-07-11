import * as Extensions from "trimble-connect-workspace-api";
import { useState, useEffect } from "react";
import './index.css'; // Import the CSS file

function App() {
  // State to store attribute data, PSET name, attribute, and selected groups
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");
  const [selectedGroups, setSelectedGroups] = useState({});

  // Function to connect to Trimble Connect Workspace API
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

  // Function to get attribute data from Trimble Connect
  async function getAttributeDataFromTrimble() {
    console.log("GET ATTRIBUTE DATA");
    await dotConnect().then(async (WorkspaceAPI) => {
      const api = await WorkspaceAPI;
      console.log("api: ", api);

      const viewerObjects = await api.viewer.getObjects();
      console.log("viewerObjects: ", viewerObjects);

      const attributeObjects = [];

      // Loop through each model object set
      for (const modelObjectsSet of viewerObjects) {
        const modelId = modelObjectsSet["modelId"];
        let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);
        console.log("Fetching properties for model ID:", modelId);

        const properties = await api.viewer.getObjectProperties(modelId, modelObjectIdsList);
        console.log("Fetched properties:", properties);

        // Loop through each property set
        properties.forEach((propertySet) => {
          if (propertySet.properties) {
            // Loop through each property
            propertySet.properties.forEach((prop) => {
              if (prop.name === psetName.replace("Example: ", "")) {
                // Loop through each sub-property
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

      // Create views for each attribute value
      await createViews(api, groupAttributeData(attributeObjects));

      // Automatically select the objects in the viewer
      await selectObjectsInViewer(api, attributeObjects);
    });
  }

  // Function to create views for each attribute value
  const createViews = async (api, groupedData) => {
    for (const group of groupedData) {
      const viewInfo = {
        name: `${group.value}`, // Only the value as the name
        objects: group.models.map(obj => ({ modelId: obj.modelId, objectRuntimeIds: [obj.id] })),
      };

      const viewSpec = await api.view.createView(viewInfo);
      console.log(`View '${group.value}' created with objects:`, viewSpec.objects);
    }
  };

  // Function to group attribute data by value
  const groupAttributeData = (data = attributeData) => {
    const groupedData = data.reduce((acc, obj) => {
      const { value } = obj;
      if (!acc[value]) {
        acc[value] = { value, count: 0, models: [] };
      }
      acc[value].count += 1;
      acc[value].models.push(obj);
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  // Function to handle checkbox change for group selection
  const handleGroupCheckboxChange = (value, isChecked) => {
    setSelectedGroups((prevSelectedGroups) => {
      const updatedGroups = { ...prevSelectedGroups };
      if (isChecked) {
        updatedGroups[value] = true;
      } else {
        delete updatedGroups[value];
      }
      return updatedGroups;
    });
  };

  // Function to process batch of models for selection
  const processBatch = async (api, batch, action) => {
    const objectSelector = {
      modelObjectIds: batch.map(m => ({ modelId: m.modelId, objectRuntimeIds: m.objectRuntimeIds }))
    };
    await api.viewer.setSelection(objectSelector, action);
  };

  // Function to select models in Trimble Connect Viewer
  const selectObjectsInViewer = async (api, objects) => {
    const modelsToProcess = objects.map(obj => ({ modelId: obj.modelId, objectRuntimeIds: [obj.id] }));

    // Process models in batches
    const batchSize = 50; // Adjust the batch size as needed
    for (let i = 0; i < modelsToProcess.length; i += batchSize) {
      const batch = modelsToProcess.slice(i, i + batchSize);
      await processBatch(api, batch, "add");
    }
  };

  // Function to render grouped attribute objects
  const renderGroupedAttributeObjects = () => {
    const groupedData = groupAttributeData();
    if (groupedData.length === 0) return <p>No data available.</p>;

    return (
      <div>
        {groupedData.map(group => (
          <div key={group.value}>
            <input
              type="checkbox"
              checked={selectedGroups[group.value] === true}
              onChange={(e) => handleGroupCheckboxChange(group.value, e.target.checked)}
            />
            <label>
              {attribute}: {group.value} <br />
              Count: {group.count}
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
          <h1>Tatta 23</h1>
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

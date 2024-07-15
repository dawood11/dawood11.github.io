import * as Extensions from "trimble-connect-workspace-api";
import { useState } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");
  const [selectedGroups, setSelectedGroups] = useState({});

  const dimensionAttributes = ["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"];

  /**
   * Connects to Trimble Extensions API.
   * @returns {Promise} Connection promise to the Trimble Extensions API.
   */
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

  /**
   * Fetches attribute data from Trimble and sets the state with the data.
   */
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
            let primaryAttribute = null;
            let dimensions = {
              Diameter: "Inneholder ikke",
              "DIM A": "Inneholder ikke",
              "DIM B": "Inneholder ikke",
              "DIM C": "Inneholder ikke",
              "DIM R": "Inneholder ikke"
            };

            propertySet.properties.forEach((prop) => {
              if (prop.name === psetName.replace("Example: ", "")) {
                prop.properties.forEach((subProp) => {
                  if (subProp.name === attribute.replace("Example: ", "")) {
                    primaryAttribute = { 
                      modelId, 
                      id: propertySet.id, 
                      class: propertySet.class, 
                      name: subProp.name,
                      value: subProp.value 
                    };
                  }

                  dimensionAttributes.forEach(dimAttr => {
                    if (subProp.name.includes(dimAttr)) {
                      dimensions[dimAttr] = subProp.value;
                    }
                  });
                });
              }
            });

            if (primaryAttribute) {
              attributeObjects.push({ ...primaryAttribute, dimensions });
            }
          }
        });
      }

      setAttributeData(attributeObjects);
      console.log("Attribute Objects: ", attributeObjects);
    });
  }

  /**
   * Handles the change event for group checkboxes.
   * Selects or deselects objects based on the checkbox state.
   * @param {string} value - The value of the group.
   * @param {boolean} isChecked - Checkbox checked state.
   */
  const handleGroupCheckboxChange = async (value, isChecked) => {
    const api = await dotConnect();
    setSelectedGroups((prevSelectedGroups) => {
      const updatedGroups = { ...prevSelectedGroups };
      if (isChecked) {
        updatedGroups[value] = true;
      } else {
        delete updatedGroups[value];
      }
      return updatedGroups;
    });

    const selectedData = attributeData.filter(obj => obj.value === value);
    if (isChecked) {
      await selectObjects(api, selectedData);
    } else {
      await deselectObjects(api, selectedData);
    }
  };

  /**
   * Selects objects in the Trimble viewer.
   * @param {object} api - The Trimble Extensions API instance.
   * @param {array} objects - The objects to be selected.
   */
  const selectObjects = async (api, objects) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    const objectSelector = {
      modelObjectIds: modelEntities
    };
    await api.viewer.setSelection(objectSelector, "add");
    console.log(`Objects selected.`);
  };

  /**
   * Deselects objects in the Trimble viewer.
   * @param {object} api - The Trimble Extensions API instance.
   * @param {array} objects - The objects to be deselected.
   */
  const deselectObjects = async (api, objects) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    const objectSelector = {
      modelObjectIds: modelEntities
    };
    await api.viewer.setSelection(objectSelector, "remove");
    console.log(`Objects deselected.`);
  };

  /**
   * Creates a view in the Trimble viewer based on selected objects.
   */
  const createView = async () => {
    const api = await dotConnect();
    const selectedData = attributeData.filter(obj => selectedGroups[obj.value]);

    if (selectedData.length === 0) {
      console.log("No objects selected to create a view.");
      return;
    }

    const modelEntities = selectedData.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    const viewInfo = {
      name: selectedData[0].value, // Use the value of the selected attribute as the view name
      description: `Antall: ${selectedData.length}, Diameter: ${selectedData[0].dimensions["Diameter"]}, DIM A: ${selectedData[0].dimensions["DIM A"]}, DIM B: ${selectedData[0].dimensions["DIM B"]}, DIM C: ${selectedData[0].dimensions["DIM C"]}, DIM R: ${selectedData[0].dimensions["DIM R"]}`,
      objects: modelEntities
    };

    const viewSpec = await api.view.createView(viewInfo);
    console.log(`View created with objects:`, viewSpec.objects);

    await api.view.setView(viewSpec.id);
    console.log(`View set as active.`);
  };

  /**
   * Fits the Trimble viewer to the selected objects.
   */
  const fitToView = async () => {
    const api = await dotConnect();
    const selectedData = attributeData.filter(obj => selectedGroups[obj.value]);

    if (selectedData.length === 0) {
      console.log("No objects selected to fit view.");
      return;
    }

    const modelEntities = selectedData.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    await api.viewer.fitToView({ modelObjectIds: modelEntities });
    console.log(`View fitted to selected objects.`);
  };

  /**
   * Groups attribute data by their values.
   * @param {array} data - The attribute data to be grouped.
   * @returns {array} - The grouped attribute data.
   */
  const groupAttributeData = (data = attributeData) => {
    const groupedData = data.reduce((acc, obj) => {
      const { value } = obj;
      if (!acc[value]) {
        acc[value] = { value, antall: 0, models: [], dimensions: obj.dimensions };
      }
      acc[value].antall += 1;
      acc[value].models.push(obj);
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  /**
   * Renders the grouped attribute objects with checkboxes.
   * @returns {JSX.Element} - The rendered grouped attribute objects.
   */
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
              Antall: {group.antall} <br />
              Diameter: {group.dimensions["Diameter"]} <br />
              DIM A: {group.dimensions["DIM A"]} <br />
              DIM B: {group.dimensions["DIM B"]} <br />
              DIM C: {group.dimensions["DIM C"]} <br />
              DIM R: {group.dimensions["DIM R"]}
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
          <h1>Tatta 37</h1>
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
          <button onClick={fitToView}>Fit to View</button>
          <button onClick={createView}>Create View</button>
        </div>
      </div>
    </>
  );
}

export default App;

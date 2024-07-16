import * as Extensions from "trimble-connect-workspace-api";
import { useState, useCallback, useMemo } from "react";
import './index.css'; // Import the CSS file

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");
  const [selectedGroups, setSelectedGroups] = useState({});

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
  };

  const colors = useMemo(() => ({
    group1: generateRandomColor(),
    group2: generateRandomColor(),
    group3: generateRandomColor(),
    // Add more colors as needed
  }), []);

  const getColorForGroup = useCallback((value) => {
    // Assign colors based on value (simplified example)
    const groupKeys = Object.keys(colors);
    const index = Object.keys(selectedGroups).indexOf(value) % groupKeys.length;
    return colors[groupKeys[index]];
  }, [colors, selectedGroups]);

  const dotConnect = useCallback(async () => {
    return await Extensions.connect(
      window.parent,
      (event) => {
        switch (event) {
          case "extension.command":
          case "extension.accessToken":
          case "extension.userSettingsChanged":
            break;
          default:
        }
      },
      30000
    );
  }, []);

  const colorizeObjects = useCallback(async (api, objects, color) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id],
      color
    }));

    await api.viewer.setObjectColors(modelEntities);
    console.log(`Objects colorized.`);
  }, []);

  const groupAttributeData = useCallback((data = attributeData) => {
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
  }, [attributeData]);

  const getAttributeDataFromTrimble = useCallback(async () => {
    const dimensionAttributes = ["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"];

    console.log("GET ATTRIBUTE DATA");
    const api = await dotConnect();
    console.log("api: ", api);

    const viewerObjects = await api.viewer.getObjects();
    console.log("viewerObjects: ", viewerObjects);

    const attributeObjects = [];
    const batchSize = 1000;

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);
      console.log("Fetching properties for model ID:", modelId);

      for (let i = 0; i < modelObjectIdsList.length; i += batchSize) {
        const batch = modelObjectIdsList.slice(i, i + batchSize);
        const properties = await api.viewer.getObjectProperties(modelId, batch);
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
    }

    setAttributeData(attributeObjects);
    console.log("Attribute Objects: ", attributeObjects);

    // Colorize objects based on group
    const groupedData = groupAttributeData(attributeObjects);
    groupedData.forEach(group => {
      const color = generateRandomColor();
      colorizeObjects(api, group.models, color);
    });
  }, [dotConnect, psetName, attribute, groupAttributeData, colorizeObjects]);

  const selectObjects = useCallback(async (api, objects) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    const objectSelector = {
      modelObjectIds: modelEntities
    };
    await api.viewer.setSelection(objectSelector, "add");
    console.log(`Objects selected.`);
  }, []);

  const deselectObjects = useCallback(async (api, objects) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    const objectSelector = {
      modelObjectIds: modelEntities
    };
    await api.viewer.setSelection(objectSelector, "remove");
    console.log(`Objects deselected.`);
  }, []);

  const resetObjectColors = useCallback(async (api, objects) => {
    const modelEntities = objects.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id],
      color: { r: 255, g: 255, b: 255 } // Reset to default color
    }));

    await api.viewer.setObjectColors(modelEntities);
    console.log(`Objects color reset.`);
  }, []);

  const handleGroupClick = useCallback(async (value) => {
    const api = await dotConnect();
    setSelectedGroups((prevSelectedGroups) => {
      const updatedGroups = { ...prevSelectedGroups };
      if (updatedGroups[value]) {
        delete updatedGroups[value];
      } else {
        updatedGroups[value] = true;
      }
      return updatedGroups;
    });

    const selectedData = attributeData.filter(obj => obj.value === value);
    if (selectedGroups[value]) {
      await deselectObjects(api, selectedData);
      await resetObjectColors(api, selectedData);
    } else {
      await selectObjects(api, selectedData);
      const color = getColorForGroup(value);
      await colorizeObjects(api, selectedData, color);
    }
  }, [attributeData, dotConnect, selectedGroups, getColorForGroup, selectObjects, deselectObjects, colorizeObjects, resetObjectColors]);

  const createView = useCallback(async () => {
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
      name: selectedData[0].value,
      description: `Beskrivelse\nAntall: ${selectedData.length}\nDiameter: ${selectedData[0].dimensions["Diameter"]}\nDIM A: ${selectedData[0].dimensions["DIM A"]}\nDIM B: ${selectedData[0].dimensions["DIM B"]}\nDIM C: ${selectedData[0].dimensions["DIM C"]}\nDIM R: ${selectedData[0].dimensions["DIM R"]}`,
      objects: modelEntities
    };

    const viewSpec = await api.view.createView(viewInfo);
    console.log(`View created with objects:`, viewSpec.objects);

    await api.view.setView(viewSpec.id);
    console.log(`View set as active.`);
  }, [attributeData, selectedGroups, dotConnect]);

  const fitToView = useCallback(async () => {
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
  }, [attributeData, selectedGroups, dotConnect]);

  const renderGroupedAttributeObjects = useCallback(() => {
    const groupedData = groupAttributeData();

    return (
      <div className="attribute-cards">
        {groupedData.map(group => (
          <div 
            key={group.value} 
            className={`attribute-card ${selectedGroups[group.value] ? 'selected' : ''}`}
            onClick={() => handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
          </div>
        ))}
      </div>
    );
  }, [groupAttributeData, selectedGroups, handleGroupClick]);

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <h1>
                <span className="pos">POS.</span>
                <span className="flow">Flow</span>
              </h1>
            </div>
            <nav>
              <a href="#" onClick={getAttributeDataFromTrimble}>
                <img src="https://dawood11.github.io/trimble-test/src/assets/power-button.png" alt="Start" className="nav-icon" />
              </a>
              <a href="#" onClick={createView}>
                <img src="https://dawood11.github.io/trimble-test/src/assets/camera.png" alt="Lag visning" className="nav-icon" />
              </a>
              <a href="#">
                <img src="https://dawood11.github.io/trimble-test/src/assets/download.png" alt="Generer" className="nav-icon" />
              </a>
            </nav>
          </div>
        </header>
        <main className="content">
          <div className="input-section">
            <input
              type="text"
              placeholder="Example: AndfjordSalmon"
              value={psetName}
              onChange={(e) => setPsetName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Example: A22 MMI"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="buttons">
            <button onClick={fitToView}>Fit to View</button>
          </div>
          {renderGroupedAttributeObjects()}
        </main>
        <footer>
          <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo"/>
          <p>Utviklet av Yasin Rafiq</p>
          <p>Version 1.0</p>
        </footer>
      </div>
    </>
  );
}

export default App;

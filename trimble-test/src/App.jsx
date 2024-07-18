import * as Extensions from "trimble-connect-workspace-api";
import { useState, useCallback } from "react";
import './index.css'; // Import the CSS file
import { saveAs } from 'file-saver'; // Import the file-saver library
import QRCode from 'qrcode'; // Import the qrcode library
import ExcelJS from 'exceljs'; // Import the exceljs library

function App() {
  const [attributeData, setAttributeData] = useState([]);
  const [psetName, setPsetName] = useState("Example: AndfjordSalmon");
  const [attribute, setAttribute] = useState("Example: A22 MMI");
  const [selectedGroups, setSelectedGroups] = useState({});
  const [views, setViews] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [modelName, setModelName] = useState("Model");

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

  const getProjectId = useCallback(async () => {
    const api = await dotConnect();
    const project = await api.project.getProject();
    setProjectId(project.id);
    return project.id;
  }, [dotConnect]);

  const getModelName = useCallback(async () => {
    const api = await dotConnect();
    const viewer = api.viewer;
    const models = await viewer.getModels();
    if (models.length > 0) {
      setModelName(models[0].name);
    }
  }, [dotConnect]);

  const getViews = useCallback(async () => {
    const api = await dotConnect();
    const viewApi = api.view;
    const allViews = await viewApi.getViews();
    setViews(allViews);
  }, [dotConnect]);

  const getAttributeDataFromTrimble = useCallback(async () => {
    const dimensionAttributes = ["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"];

    console.log("GET ATTRIBUTE DATA");
    const api = await dotConnect();
    await getProjectId();
    await getModelName();
    await getViews();

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
              Diameter: "--",
              "DIM A": "--",
              "DIM B": "--",
              "DIM C": "--",
              "DIM R": "--"
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
  }, [dotConnect, psetName, attribute, getProjectId, getModelName, getViews]);

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
    } else {
      await selectObjects(api, selectedData);
    }
  }, [attributeData, dotConnect, selectedGroups]);

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

  const exportToExcel = async () => {
    const groupedData = groupAttributeData();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attribute Data');

    // Set column widths
    worksheet.columns = [
      { width: 15 }, // A
      { width: 15 }, // B
      { width: 15 }, // C
      { width: 15 }, // D
      { width: 15 }, // E
      { width: 15 }, // F
      { width: 15 }, // G
      { width: 15 }, // H
      { width: 15 }, // I
      { width: 15 }, // J
    ];

    await Promise.all(groupedData.map(async (group, index) => {
        const rowStart = index * 5 + 2;
        const view = views.find(v => v.name === group.value);
        const viewId = view ? view.id : null;
        const projId = projectId || null;
        const viewUrl = projId && viewId ? `https://web.connect.trimble.com/projects/${projId}/viewer/3d?viewId=${viewId}&region=europe` : null;
        let qrCodeDataUrl = null;

        if (viewUrl) {
          qrCodeDataUrl = await QRCode.toDataURL(viewUrl);
        }

        // Merge cells for the design
        worksheet.mergeCells(`A${rowStart}:A${rowStart + 1}`);
        worksheet.mergeCells(`B${rowStart}:C${rowStart}`);
        worksheet.mergeCells(`B${rowStart + 1}:C${rowStart + 1}`);
        worksheet.mergeCells(`D${rowStart}:E${rowStart}`);
        worksheet.mergeCells(`D${rowStart + 1}:E${rowStart + 1}`);
        worksheet.mergeCells(`F${rowStart}:F${rowStart + 1}`);
        worksheet.mergeCells(`G${rowStart}:G${rowStart + 1}`);
        worksheet.mergeCells(`H${rowStart}:H${rowStart + 1}`);
        worksheet.mergeCells(`I${rowStart}:I${rowStart + 2}`);

        // Set values and styles
        worksheet.getCell(`A${rowStart}`).value = group.value;
        worksheet.getCell(`A${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`A${rowStart}`).font = { size: 14, bold: true };

        worksheet.getCell(`B${rowStart}`).value = 'DIAMETER';
        worksheet.getCell(`B${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`B${rowStart}`).font = { bold: true };

        worksheet.getCell(`D${rowStart}`).value = group.dimensions["DIM A"];
        worksheet.getCell(`D${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`F${rowStart}`).value = group.dimensions["DIM C"];
        worksheet.getCell(`F${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`H${rowStart}`).value = 'DIM C';
        worksheet.getCell(`H${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`B${rowStart + 1}`).value = 'ANTALL';
        worksheet.getCell(`B${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`B${rowStart + 1}`).font = { bold: true };

        worksheet.getCell(`D${rowStart + 1}`).value = group.dimensions["DIM B"];
        worksheet.getCell(`D${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`F${rowStart + 1}`).value = group.dimensions["DIM D"];
        worksheet.getCell(`F${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`H${rowStart + 1}`).value = 'DIM D';
        worksheet.getCell(`H${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`G${rowStart}`).value = group.dimensions.Diameter;
        worksheet.getCell(`G${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`H${rowStart}`).value = group.dimensions["DIM A"];
        worksheet.getCell(`H${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`I${rowStart}`).value = group.dimensions["DIM C"];
        worksheet.getCell(`I${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`G${rowStart + 1}`).value = group.dimensions["DIM B"];
        worksheet.getCell(`G${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`H${rowStart + 1}`).value = group.dimensions["DIM D"];
        worksheet.getCell(`H${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`I${rowStart + 1}`).value = group.dimensions["DIM R"];
        worksheet.getCell(`I${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        // Add QR code
        if (qrCodeDataUrl) {
          const imageId = workbook.addImage({
            base64: qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
            extension: 'png',
          });
          worksheet.addImage(imageId, {
            tl: { col: 8, row: rowStart - 1 },
            ext: { width: 90, height: 90 },
          });
        }

        // Add border to the cells to mimic card style
        for (let r = rowStart; r <= rowStart + 1; r++) {
          for (let c = 1; c <= 9; c++) {
            worksheet.getCell(r, c).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          }
        }
    }));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    const filename = `${modelName}_Bøyeliste.xlsx`;
    saveAs(blob, filename);
    console.log("Exported data to Excel");
  };

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
              <a href="#" onClick={exportToExcel}>
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
          <p>Beta 1.6</p>
        </footer>
      </div>
    </>
  );
}

export default App;

import { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import './index.css'; // Import the CSS file
import { saveAs } from 'file-saver'; // Import the file-saver library
import QRCode from 'qrcode'; // Import the qrcode library
import ExcelJS from 'exceljs'; // Import the exceljs library

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeData: [],
      psetName: "Example: AndfjordSalmon",
      attribute: "Example: A22 MMI",
      selectedGroups: {},
      views: [],
      projectId: null,
      modelName: "Model",
    };
  }

  dotConnect = async () => {
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
  };

  getProjectId = async () => {
    const api = await this.dotConnect();
    const project = await api.project.getProject();
    this.setState({ projectId: project.id });
    return project.id;
  };

  getModelName = async () => {
    const api = await this.dotConnect();
    const viewer = api.viewer;
    const models = await viewer.getModels();
    if (models.length > 0) {
      this.setState({ modelName: models[0].name });
    }
  };

  getViews = async () => {
    const api = await this.dotConnect();
    const viewApi = api.view;
    const allViews = await viewApi.getViews();
    this.setState({ views: allViews });
  };

  getAttributeDataFromTrimble = async () => {
    const { psetName, attribute } = this.state;
    const dimensionAttributes = ["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"];

    console.log("GET ATTRIBUTE DATA");
    const api = await this.dotConnect();
    await this.getProjectId();
    await this.getModelName();
    await this.getViews();

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

    this.setState({ attributeData: attributeObjects });
    console.log("Attribute Objects: ", attributeObjects);
  };

  handleGroupClick = async (value) => {
    const api = await this.dotConnect();
    this.setState((prevState) => {
      const updatedGroups = { ...prevState.selectedGroups };
      if (updatedGroups[value]) {
        delete updatedGroups[value];
      } else {
        updatedGroups[value] = true;
      }

      return { selectedGroups: updatedGroups };
    }, async () => {
      const selectedData = this.state.attributeData.filter(obj => this.state.selectedGroups[obj.value]);
      if (Object.keys(this.state.selectedGroups).length > 0) {
        await this.selectObjects(api, selectedData);
      }
    });
  };

  selectObjects = async (api, objects) => {
    const modelEntities = objects.reduce((acc, obj) => {
      const model = acc.find(m => m.modelId === obj.modelId);
      if (model) {
        model.entityIds.push(obj.id);
      } else {
        acc.push({ modelId: obj.modelId, entityIds: [obj.id] });
      }
      return acc;
    }, []);

    console.log(`Selecting objects: ${JSON.stringify(modelEntities)}`);

    // Show only the selected objects
    await api.viewer.isolateEntities(modelEntities);
    console.log(`Isolated selected objects.`);
  
    // Fit the view to the selected objects
    await api.viewer.setCamera("reset");
    console.log(`View reset to fit selected objects.`);
  };

  deselectObjects = async (api, objects) => {
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

  createView = async () => {
    const api = await this.dotConnect();
    const selectedData = this.state.attributeData.filter(obj => this.state.selectedGroups[obj.value]);

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
  };

  ghostMode = async () => {
    const api = await this.dotConnect();
    const selectedData = this.state.attributeData.filter(obj => this.state.selectedGroups[obj.value]);

    if (selectedData.length === 0) {
      console.log("No objects selected for ghost mode.");
      return;
    }

    const modelEntities = selectedData.map(obj => ({
      modelId: obj.modelId,
      objectRuntimeIds: [obj.id]
    }));

    await api.viewer.presentation.ghost(modelEntities);
    console.log(`Applied ghost mode to selected objects.`);
  };

  groupAttributeData = (data = this.state.attributeData) => {
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

  exportToExcel = async () => {
    const groupedData = this.groupAttributeData();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attribute Data');

    // Set column widths
    worksheet.columns = [
      { width: 20 }, // A
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
        const rowStart = index * 10 + 2; // Adjusted for 4 rows spacing between cards
        const view = this.state.views.find(v => v.name === group.value);
        const viewId = view ? view.id : null;
        const projId = this.state.projectId || null;
        const viewUrl = projId && viewId ? `https://web.connect.trimble.com/projects/${projId}/viewer/3d?viewId=${viewId}&region=europe` : null;
        let qrCodeDataUrl = null;

        if (viewUrl) {
          qrCodeDataUrl = await QRCode.toDataURL(viewUrl);
        }

        // Merge cells for the design
        worksheet.mergeCells(`A${rowStart}:A${rowStart + 4}`);
        worksheet.mergeCells(`I${rowStart}:J${rowStart + 4}`);

        // Set values and styles
        worksheet.getCell(`A${rowStart}`).value = group.value;
        worksheet.getCell(`A${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`A${rowStart}`).font = { size: 14, bold: true };

        worksheet.getCell(`B${rowStart}`).value = 'DIAMETER';
        worksheet.getCell(`B${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`B${rowStart}`).font = { bold: true };

        worksheet.getCell(`C${rowStart}`).value = group.dimensions.Diameter;
        worksheet.getCell(`C${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`D${rowStart}`).value = 'DIM A';
        worksheet.getCell(`D${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`D${rowStart}`).font = { bold: true };

        worksheet.getCell(`E${rowStart}`).value = group.dimensions["DIM A"];
        worksheet.getCell(`E${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`F${rowStart}`).value = 'DIM C';
        worksheet.getCell(`F${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`F${rowStart}`).font = { bold: true };

        worksheet.getCell(`G${rowStart}`).value = group.dimensions["DIM C"];
        worksheet.getCell(`G${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`B${rowStart + 1}`).value = 'ANTALL';
        worksheet.getCell(`B${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`B${rowStart + 1}`).font = { bold: true };

        worksheet.getCell(`C${rowStart + 1}`).value = group.antall;
        worksheet.getCell(`C${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`D${rowStart + 1}`).value = 'DIM B';
        worksheet.getCell(`D${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`D${rowStart + 1}`).font = { bold: true };

        worksheet.getCell(`E${rowStart + 1}`).value = group.dimensions["DIM B"];
        worksheet.getCell(`E${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getCell(`F${rowStart + 1}`).value = 'DIM D';
        worksheet.getCell(`F${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(`F${rowStart + 1}`).font = { bold: true };

        worksheet.getCell(`G${rowStart + 1}`).value = group.dimensions["DIM D"];
        worksheet.getCell(`G${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

        // Add QR code
        if (qrCodeDataUrl) {
          const imageId = workbook.addImage({
            base64: qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
            extension: 'png',
          });
          worksheet.addImage(imageId, {
            tl: { col: 8.5 + 0.5, row: rowStart - 1 + 0.35 }, // Move half a cell to the right (0.5 cells) and one cell up (-1 row)
            ext: { width: 90, height: 90 },
          });
        }

        // Add border to the cells to mimic card style
        for (let r = rowStart; r <= rowStart + 4; r++) {
          for (let c = 1; c <= 10; c++) { // Adjusted to cover column I and J
            if (r === rowStart || r === rowStart + 4 || c === 1 || c === 10) { // Adjusted to cover column I and J
              worksheet.getCell(r, c).border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
              };
            } else {
              worksheet.getCell(r, c).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
            }
          }
        }
    }));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    const filename = `${this.state.modelName}_Bøyeliste.xlsx`;
    saveAs(blob, filename);
    console.log("Exported data to Excel");
  };

  renderGroupedAttributeObjects = () => {
    const groupedData = this.groupAttributeData();
    const selectedData = groupedData.filter(group => this.state.selectedGroups[group.value]);
    const nonSelectedData = groupedData.filter(group => !this.state.selectedGroups[group.value]);

    return (
      <div className="attribute-cards">
        {selectedData.map(group => (
          <div 
            key={group.value} 
            className={`attribute-card selected`}
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
          </div>
        ))}
        {selectedData.length > 0 && <hr className="separator" />}
        {nonSelectedData.map(group => (
          <div 
            key={group.value} 
            className={`attribute-card`}
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
          </div>
        ))}
      </div>
    );
  };

  render() {
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
                <a href="#" onClick={this.getAttributeDataFromTrimble}>
                  <img src="https://dawood11.github.io/trimble-test/src/assets/power-button.png" alt="Start" className="nav-icon" />
                </a>
                <a href="#" onClick={this.createView}>
                  <img src="https://dawood11.github.io/trimble-test/src/assets/camera.png" alt="Lag visning" className="nav-icon" />
                </a>
                <a href="#" onClick={this.exportToExcel}>
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
                value={this.state.psetName}
                onChange={(e) => this.setState({ psetName: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Example: A22 MMI"
                value={this.state.attribute}
                onChange={(e) => this.setState({ attribute: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="buttons">
              <button onClick={this.ghostMode}>Skyggemodus</button>
            </div>
            {this.renderGroupedAttributeObjects()}
          </main>
          <footer>
            <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo"/>
            <p>Utviklet av Yasin Rafiq</p>
            <p>Beta 1.0</p>
          </footer>
        </div>
      </>
    );
  }
}

export default App;

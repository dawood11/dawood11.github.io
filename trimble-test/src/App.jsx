import React, { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import './index.css'; 
import { saveAs } from 'file-saver'; 
import QRCode from 'qrcode'; 
import ExcelJS from 'exceljs'; 
import { SVG } from '@svgdotjs/svg.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeData: [],
      selectedGroups: {},
      views: [],
      projectId: null,
      modelName: "Model",
      ghostMode: false,
      searchTerm: "",
      showSubHeader: false,
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
    const posAttributes = ["Pos.nr.", "Pos.nr", "Pos nr.", "Pos"];
    const dimensionAttributes = ["Diameter", "DIM A", "DIM B", "DIM C", "DIM R"];
    const bvbsAttributes = ["BVBS"]; 

    const api = await this.dotConnect();
    await this.getProjectId();
    await this.getModelName();
    await this.getViews();

    const viewerObjects = await api.viewer.getObjects();

    const attributeObjects = [];
    const batchSize = 1000;

    for (const modelObjectsSet of viewerObjects) {
      const modelId = modelObjectsSet["modelId"];
      let modelObjectIdsList = modelObjectsSet["objects"].map((obj) => obj.id);

      for (let i = 0; i < modelObjectIdsList.length; i += batchSize) {
        const batch = modelObjectIdsList.slice(i, i + batchSize);
        const properties = await api.viewer.getObjectProperties(modelId, batch);

        properties.forEach((propertySet) => {
          if (propertySet.properties) {
            let primaryAttribute = null;
            let bvbs = null;
            let dimensions = {
              Diameter: "--",
              "DIM A": "--",
              "DIM B": "--",
              "DIM C": "--",
              "DIM R": "--"
            };

            propertySet.properties.forEach((prop) => {
              prop.properties.forEach((subProp) => {
                if (posAttributes.some(attr => subProp.name.includes(attr))) {
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

                if (bvbsAttributes.some(attr => subProp.name.includes(attr))) {
                  bvbs = subProp.value;
                }
              });
            });

            if (primaryAttribute) {
              attributeObjects.push({ 
                ...primaryAttribute, 
                dimensions,
                bvbs 
              });
            }
          }
        });
      }
    }

    this.setState({ attributeData: attributeObjects });
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

    await api.viewer.isolateEntities(modelEntities);
  
    await api.viewer.setCamera("reset");
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
  };

  createView = async () => {
    const api = await this.dotConnect();
    const selectedData = this.state.attributeData.filter(obj => this.state.selectedGroups[obj.value]);

    if (selectedData.length === 0) {
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

    await api.view.setView(viewSpec.id);
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  sortAttributeData = (data) => {
    return data.sort((a, b) => {
      const regex = /(\D+)(\d+)/;
      const aMatch = a.value.match(regex);
      const bMatch = b.value.match(regex);

      if (aMatch && bMatch) {
        if (aMatch[1] === bMatch[1]) {
          return parseInt(aMatch[2]) - parseInt(bMatch[2]);
        } else {
          return aMatch[1].localeCompare(bMatch[1]);
        }
      }

      return a.value.localeCompare(b.value);
    });
  };

  groupAttributeData = (data = this.state.attributeData) => {
    const filteredData = data.filter(obj =>
      obj.value.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    const sortedData = this.sortAttributeData(filteredData);

    const groupedData = sortedData.reduce((acc, obj) => {
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

  parseBVBS = (bvbsString) => {
    const segments = bvbsString.split('@');
    const bvbsData = {};

    segments.forEach(segment => {
      const key = segment[0];
      const value = segment.slice(1);

      switch (key) {
        case 'l':
          if (!bvbsData.lengths) bvbsData.lengths = [];
          bvbsData.lengths.push(parseFloat(value));
          break;
        case 'w':
          if (!bvbsData.angles) bvbsData.angles = [];
          bvbsData.angles.push(parseFloat(value));
          break;
        case 'p':
          bvbsData.position = value;
          break;
        case 'n':
          bvbsData.count = parseInt(value, 10);
          break;
        case 'e':
          bvbsData.weight = parseFloat(value);
          break;
        case 'd':
          bvbsData.diameter = parseFloat(value);
          break;
        case 'g':
          bvbsData.material = value;
          break;
        case 's':
          bvbsData.spacing = parseFloat(value);
          break;
        case 'G':
          if (!bvbsData.dimensions) bvbsData.dimensions = {};
          if (!bvbsData.dimensions.A) bvbsData.dimensions.A = parseFloat(value);
          else if (!bvbsData.dimensions.B) bvbsData.dimensions.B = parseFloat(value);
          else bvbsData.dimensions.C = parseFloat(value);
          break;
        default:
          bvbsData[key] = value;
          break;
      }
    });

    return bvbsData;
  };

  generate2DDrawing = (bvbsData) => {
    const draw = SVG().size(500, 500).viewbox(0, 0, 500, 500);

    let currentX = 50; 
    let currentY = 450;
    let currentAngle = 0;

    if (bvbsData.lengths && bvbsData.angles) {
      bvbsData.lengths.forEach((length, index) => {
        const endX = currentX + length * Math.cos((Math.PI / 180) * currentAngle);
        const endY = currentY - length * Math.sin((Math.PI / 180) * currentAngle);

        if (index < bvbsData.angles.length && bvbsData.angles[index] !== 0) {
          const angle = bvbsData.angles[index];
          const radius = bvbsData.diameter / 2;
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const path = `M${currentX},${currentY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`;
          draw.path(path).stroke({ width: 2 }).fill('none');
        } else {
          draw.line(currentX, currentY, endX, endY).stroke({ width: 2 });
        }

        currentX = endX;
        currentY = endY;

        if (index < bvbsData.angles.length) {
          currentAngle += bvbsData.angles[index];
        }
      });
    }

    const svgString = draw.svg();
    return svgString;
  };

  exportToExcel = async () => {
    const groupedData = this.groupAttributeData();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attribute Data');

    worksheet.columns = [
      { width: 20 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
    ];

    await Promise.all(groupedData.map(async (group, index) => {
      const rowStart = index * 10 + 2;
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
      worksheet.mergeCells(`D${rowStart}:E${rowStart + 4}`);

      // Set values and styles
      worksheet.getCell(`A${rowStart}`).value = group.value;
      worksheet.getCell(`A${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(`A${rowStart}`).font = { size: 14, bold: true };

      worksheet.getCell(`B${rowStart}`).value = 'DIAMETER';
      worksheet.getCell(`B${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(`B${rowStart}`).font = { bold: true };

      worksheet.getCell(`C${rowStart}`).value = group.dimensions.Diameter;
      worksheet.getCell(`C${rowStart}`).alignment = { vertical: 'middle', horizontal: 'center' };

      worksheet.getCell(`B${rowStart + 1}`).value = 'ANTALL';
      worksheet.getCell(`B${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(`B${rowStart + 1}`).font = { bold: true };

      worksheet.getCell(`C${rowStart + 1}`).value = group.antall;
      worksheet.getCell(`C${rowStart + 1}`).alignment = { vertical: 'middle', horizontal: 'center' };

      const parsedBVBS = this.parseBVBS(group.bvbs);
      const drawingSVG = this.generate2DDrawing(parsedBVBS);
      const imageId = workbook.addImage({
        base64: window.btoa(drawingSVG),
        extension: 'svg',
      });
      worksheet.addImage(imageId, {
        tl: { col: 7, row: rowStart - 1 },
        ext: { width: 100, height: 100 },
      });

      if (qrCodeDataUrl) {
        const qrImageId = workbook.addImage({
          base64: qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
          extension: 'png',
        });
        worksheet.addImage(qrImageId, {
          tl: { col: 8.5 + 0.5, row: rowStart - 1 + 0.35 },
          ext: { width: 90, height: 90 },
        });
      }

      for (let r = rowStart; r <= rowStart + 4; r++) {
        for (let c = 1; c <= 10; c++) {
          if (r === rowStart || r === rowStart + 4 || c === 1 || c === 10) {
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
                <img src="https://dawood11.github.io/trimble-test/src/assets/exportxl.png" alt="Generer" className="nav-icon" />
              </a>
            </nav>
          </div>
        </header>

        <div className="sub-header">
          <input
            type="text"
            className="input-field"
            placeholder="Søk"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
          />
        </div>

        <main className="content">
          {this.renderGroupedAttributeObjects()}
        </main>
        <footer>
          <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo"/>
          <p>Utviklet av Yasin Rafiq</p>
          <p>Beta 1.1</p>
        </footer>
        </div>
      </>
    );
  }
}

export default App;

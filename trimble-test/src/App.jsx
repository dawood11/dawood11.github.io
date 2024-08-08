import React, { Component } from 'react';
import * as Extensions from 'trimble-connect-workspace-api';
import './index.css';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import ExcelJS from 'exceljs';

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
      showSubHeader: true,
      loading: false,
      selectedBVBS: null,
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
    this.setState({ loading: true });

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
            let dimensions = {
              Diameter: "--",
              "DIM A": "--",
              "DIM B": "--",
              "DIM C": "--",
              "DIM R": "--"
            };
            let bvbs = null;

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
              attributeObjects.push({ ...primaryAttribute, dimensions, bvbs });
            }
          }
        });
      }
    }

    setTimeout(() => {
      this.setState({ attributeData: attributeObjects, loading: false });
    }, 2000);
  };

  handleBVBSSelection = (bvbs) => {
    // Logging to check if the function is called correctly
    console.log("BVBS selected:", bvbs);
    this.setState({ selectedBVBS: bvbs });
  };

  parseBVBS = (bvbs) => {
    const segments = bvbs.split('@');
    const data = {};

    segments.forEach(segment => {
      const key = segment[0];
      const value = segment.slice(1);
      data[key] = value;
    });

    return data;
  };

  renderBVBSVisualization = () => {
    const { selectedBVBS } = this.state;

    if (!selectedBVBS) return null;

    // Logging to check if the BVBS string is parsed correctly
    console.log("Parsing BVBS string:", selectedBVBS);

    const bvbsData = this.parseBVBS(selectedBVBS);

    const length1 = parseInt(bvbsData.G.slice(1)); // Length before first bend
    const angle1 = parseInt(bvbsData.w); // Angle of the first bend
    const length2 = parseInt(bvbsData.l); // Length after first bend

    const x1 = length1;
    const y1 = 0;
    const x2 = x1 + length2 * Math.cos((angle1 * Math.PI) / 180);
    const y2 = y1 - length2 * Math.sin((angle1 * Math.PI) / 180);

    return (
      <svg width="600" height="400" style={{ border: '1px solid black', margin: '20px 0' }}>
        <line x1="0" y1="200" x2={x1} y2="200" stroke="black" strokeWidth="4" />
        <line x1={x1} y1="200" x2={x2} y2={200 + y2} stroke="black" strokeWidth="4" />
      </svg>
    );
  };

  groupAttributeData = (data = this.state.attributeData) => {
    const filteredData = data.filter(obj =>
      obj.value.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
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

  renderGroupedAttributeObjects = () => {
    const groupedData = this.groupAttributeData();
    const selectedData = groupedData.filter(group => this.state.selectedGroups[group.value]);
    const nonSelectedData = groupedData.filter(group => !this.state.selectedGroups[group.value]);

    return (
      <div className="attribute-cards">
        {selectedData.map(group => (
          <div 
            key={group.value} 
            className="attribute-card selected"
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
            {group.models[0].bvbs && (
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent onClick
                this.handleBVBSSelection(group.models[0].bvbs);
              }}>
                Vis BVBS
              </button>
            )}
          </div>
        ))}
        {selectedData.length > 0 && <hr className="separator" />}
        {nonSelectedData.map(group => (
          <div 
            key={group.value} 
            className="attribute-card"
            onClick={() => this.handleGroupClick(group.value)}
          >
            <strong>{group.value}</strong><br />
            Antall: {group.antall}
            {group.models[0].bvbs && (
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent onClick
                this.handleBVBSSelection(group.models[0].bvbs);
              }}>
                Vis BVBS
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  exportToExcel = async () => {
    const groupedData = this.groupAttributeData();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attribute Data');
  
    worksheet.columns = [
      { width: 20 }, // A
      { width: 15 }, // B
      { width: 15 }, // C
      { width: 15 }, // D
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
  
        worksheet.mergeCells(`A${rowStart}:A${rowStart + 4}`);
        worksheet.mergeCells(`D${rowStart}:E${rowStart + 4}`);
  
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
  
        if (qrCodeDataUrl) {
          const imageId = workbook.addImage({
            base64: qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
            extension: 'png',
          });
          worksheet.addImage(imageId, {
            tl: { col: 3.5, row: rowStart - 1 + 0.35 },
            ext: { width: 90, height: 90 },
          });
        }
  
        for (let r = rowStart; r <= rowStart + 4; r++) {
          for (let c = 1; c <= 4; c++) {
            worksheet.getCell(r, c).border = {
              top: { style: 'medium' },
              left: { style: 'medium' },
              bottom: { style: 'medium' },
              right: { style: 'medium' },
            };
          }
        }
    }));
  
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
  
    const filename = `${this.state.modelName}_Bøyeliste.xlsx`;
    saveAs(blob, filename);
  };

  toggleGhostMode = async () => {
    const api = await this.dotConnect();
    const newMode = !this.state.ghostMode;

    if (newMode) {
      await api.viewer.activateTool("ghostMode");
    } else {
      await api.viewer.deactivateTool("ghostMode");
    }

    this.setState({ ghostMode: newMode });
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
          {this.state.loading ? (
            <div className="loading-message">
              Leser armeringen, vennligst vent...
            </div>
          ) : (
            <>
              {this.renderGroupedAttributeObjects()}
              {this.renderBVBSVisualization()}
            </>
          )}
        </main>
        <footer>
          <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo"/>
          <p>Utviklet av Yasin Rafiq</p>
          <p>T3</p>
        </footer>
        </div>
      </>
    );
  }
}

export default App;

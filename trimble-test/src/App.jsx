import "./App.css";

import * as Extensions from "trimble-connect-project-workspace-api";

function App() {
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

  // const setMenu = () => {
  //   alert("MENYYY");
  //   dotConnect().then((WorkspaceAPI) => {
  //     const mainMenuObject = {
  //       title: "DET - TC-Extensions",
  //       icon: "https://de-tech.no/trimble-connect-web-extensions/favicon.png",
  //       command: "main_nav_menu_cliked",
  //       subMenus: [
  //         {
  //           title: "IFC-Tool",
  //           icon: "https://de-tech.no/trimble-connect-web-extensions/submenu_1.png",
  //           command: "submenu_1_clicked",
  //         },
  //         {
  //           title: "DWG-Tool",
  //           icon: "https://de-tech.no/trimble-connect-web-extensions/submenu_2.png",
  //           command: "submenu_2_clicked",
  //         },
  //       ],
  //     };
  //     WorkspaceAPI.ui.setMenu(mainMenuObject);
  //   });
  // }

  function getCurrentProjectFromTrimple() {
    console.log("GET PROJECT INFOOOO");
    alert("GET PROJECT INFOOOO");
    const data = dotConnect();
    console.log(data)
    // .then((WorkspaceAPI) => {
    //   console.log(WorkspaceAPI.project.getCurrentProject());
    //   alert(WorkspaceAPI.project.getCurrentProject());
    // });
  }

  return (
    <>
      <div>
        <button onClick={setMenu}>click me!!222</button>
        <button onClick={getCurrentProjectFromTrimple}>
          click me project info!!
        </button>
        <div className="App">
          <h1>Hei på deg</h1>
        </div>
      </div>
    </>
  );
}

export default App;

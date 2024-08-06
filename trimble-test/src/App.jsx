import React, { Component } from 'react';
import './index.css';

class App extends Component {
  state = {
    showSubHeader: true,
    searchTerm: "",
  };

  toggleSubHeader = () => {
    this.setState(prevState => ({ showSubHeader: !prevState.showSubHeader }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="logo">
              <span className="pos">ELEMENT</span>
              <span className="flow">Fabrikk</span>
            </h1>
            <nav>
              <a href="#">
                <img
                  src="https://elementer.github.io/trimble-test/src/assets/power-button.png"
                  alt="Start"
                  className="nav-icon"
                />
              </a>
              <a href="#">
                <img
                  src="https://elementer.github.io/trimble-test/src/assets/camera.png"
                  alt="Lag visning"
                  className="nav-icon"
                />
              </a>
              <a href="#">
                <img
                  src="https://elementer.github.io/trimble-test/src/assets/exportxl.png"
                  alt="Generer"
                  className="nav-icon"
                />
              </a>
              <a href="#" onClick={this.toggleSubHeader}>
                <img
                  src="https://elementer.github.io/trimble-test/src/assets/toggle-subheader.png"
                  alt="Toggle Sub-header"
                  className="nav-icon"
                />
              </a>
            </nav>
          </div>
        </header>

        {this.state.showSubHeader && (
          <div className="sub-header">
            <input
              type="text"
              className="input-field"
              placeholder="Søk"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
            />
          </div>
        )}

        <main className="content">
          {/* Content goes here */}
        </main>

        <footer>
          <img
            src="https://elementer.github.io/trimble-test/src/assets/Logo_Haehre.png"
            alt="Logo"
            className="footer-logo"
          />
          <p>Utviklet av Yasin Rafiq</p>
<<<<<<< HEAD
          <p>Beta 1.5</p>
=======
          <p>Beta 1.3</p>
>>>>>>> a2c8d892050137d11fc101539ef7d8211a301498
        </footer>
      </div>
    );
  }
}

export default App;
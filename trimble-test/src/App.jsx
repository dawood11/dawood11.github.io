import React, { useState, useEffect } from 'react';
import './index.css';
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';
import '@trimble-oss/modus-web-components/dist/modus-web-components/modus-web-components.css';

const App = () => {
  useEffect(() => {
    // Load Modus Web Components
    defineCustomElements();
  }, []);

  const [attributeData, setAttributeData] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [modelName, setModelName] = useState('Model');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="container">
      <main className="content content-panel">
        {/* Content Tree Component */}
        <modus-tree-view borderless="true">
          <modus-tree-view-item node-id="1" label="Object ID: 1">
            <modus-tree-view-item node-id="2" label="Pos.nr: 1234" />
            <modus-tree-view-item node-id="3" label="Pos.nr: 5678" />
          </modus-tree-view-item>
          <modus-tree-view-item node-id="4" label="Object ID: 2">
            <modus-tree-view-item node-id="5" label="Pos.nr: 91011" />
          </modus-tree-view-item>
        </modus-tree-view>
      </main>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>
              <span className="pos">POS.</span>
              <span className="flow">Flow</span>
            </h1>
          </div>
        </div>
      </header>
      <nav>
        {/* Add navigation items here */}
      </nav>
      <footer>
        <img src="https://dawood11.github.io/trimble-test/src/assets/Logo_Haehre.png" alt="Logo" className="footer-logo" />
        <p>Utviklet av Yasin Rafiq</p>
        <p>UTVIKLING 0.4.3</p>
      </footer>
    </div>
  );
};

export default App;
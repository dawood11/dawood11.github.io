import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [psetName, setPsetName] = useState(localStorage.getItem('psetName') || '');
  const [attribute, setAttribute] = useState(localStorage.getItem('attribute') || '');
  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('psetName', psetName);
    localStorage.setItem('attribute', attribute);
    alert('Saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter PSET Name"
          value={psetName}
          onChange={(e) => setPsetName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Attribute"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPanel;

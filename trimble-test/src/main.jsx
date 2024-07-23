import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import App from './App.jsx'
import AdminPanel from './AdminPanel.jsx'
import Login from './Login.jsx'
import './index.css'

const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAuthenticated() ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  </React.StrictMode>
)

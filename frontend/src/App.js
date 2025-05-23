import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EmployeeList from './components/Employees/EmployeeList';
import EmployeeForm from './components/Employees/EmployeeForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="container">
        <button onClick={handleLogout} style={{ float: 'right', marginBottom: '20px' }}>Logout</button>
        <Routes>
          <Route path="/" element={<EmployeeList token={token} />} />
          <Route path="/add" element={<EmployeeForm token={token} />} />
          <Route path="/edit/:id" element={<EmployeeForm token={token} editMode />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

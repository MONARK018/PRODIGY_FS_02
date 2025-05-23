import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeItem from './EmployeeItem';

export default function EmployeeList({ token }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employee/employee-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setEmployees(data);
        } else {
          setError(data.message || 'Failed to fetch employees');
        }
      } catch {
        setError('Server error');
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/employee/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(employees.filter(emp => emp._id !== id));
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className="employee-list-container">
      <div className="header-bar">
        <h2>Employee List</h2>
        <button className="btn primary" onClick={() => navigate('/add')}>Add Employee</button>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No employees found</td>
              </tr>
            ) : (
              employees.map(emp => (
                <EmployeeItem
                  key={emp._id}
                  employee={emp}
                  onDelete={handleDelete}
                  onEdit={() => navigate(`/edit/${emp._id}`)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

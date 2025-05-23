import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployeeForm({ token, editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editMode) {
      fetch(`http://localhost:5000/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (!data.message) {
            setEmployee(data);
          } else {
            setError(data.message || 'Failed to load employee');
          }
        })
        .catch(() => setError('Server error'));
    }
  }, [editMode, id, token]);

  const handleChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const { name, email, position } = employee;
    if (!name || !email || !position) {
      setError('Name, email and position are required');
      return;
    }

    try {
      const url = editMode
        ? `http://localhost:5000/api/employee/update-employee/${id}`
        : 'http://localhost:5000/api/employee/createEmployee';

      const method = editMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(employee),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={employee.department}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
        />
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

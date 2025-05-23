import React from 'react';

export default function EmployeeItem({ employee, onDelete, onEdit }) {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.position}</td>
      <td>{employee.department}</td>
      <td>{employee.phone}</td>
      <td>
        <button className="btn secondary" onClick={onEdit}>Edit</button>
        <button className="btn danger" onClick={() => onDelete(employee._id)}>Delete</button>
      </td>
    </tr>
  );
}

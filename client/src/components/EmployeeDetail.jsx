import axios from 'axios';
import {useParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/employee_detail/' + id)
      .then((result) => {
        setEmployee(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    axios
      .get('http://localhost:3000/employee/logout')
      .then((result) => {
        if (result.data.Status) {
          navigate('/start');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:3000/images/` + employee.image}
          className="emp_det_image"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

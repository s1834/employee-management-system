import axios from 'axios';
import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const EditEmployee = () => {
  const {id} = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    salary: '',
    gender: '',
    address: '',
    category_id: '',
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/category')
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:3000/auth/employee/' + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].f_name,
          email: result.data.Result[0].f_email,
          mobile: result.data.Result[0].f_mobile,
          salary: result.data.Result[0].f_salary,
          gender: result.data.Result[0].f_gender,
          address: result.data.Result[0].f_address,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3000/auth/edit_employee/' + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) => setEmployee({...employee, name: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({...employee, email: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label for="inputMobile" className="form-label">
              Mobile No.
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputMobile"
              placeholder="Enter Mobile Number"
              autoComplete="off"
              value={employee.mobile}
              onChange={(e) =>
                setEmployee({...employee, mobile: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({...employee, salary: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label for="inputGender" className="form-label">
              Gender
            </label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="genderMale"
                name="gender"
                value={employee.gender}
                onChange={(e) =>
                  setEmployee({...employee, gender: e.target.value})
                }
              />
              <label htmlFor="genderMale" className="form-label">
                Male
              </label>

              <input
                type="radio"
                id="genderFemale"
                name="gender"
                value={employee.gender}
                onChange={(e) =>
                  setEmployee({...employee, gender: e.target.value})
                }
              />
              <label htmlFor="genderFemale" className="form-label">
                Female
              </label>
            </div>
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({...employee, address: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  category_id: e.target.value,
                })
              }
            >
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

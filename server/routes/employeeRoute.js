import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employee_login', (req, res) => {
  const sql = 'SELECT * FROM t_employee WHERE f_email = ?';
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({loginStatus: false, Error: 'Query error'});
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].f_password,
        (err, response) => {
          if (err)
            return res.json({loginStatus: false, Error: 'Wrong Password'});
          if (response) {
            const email = result[0].f_email;
            const token = jwt.sign(
              {role: 'employee', email: email, id: result[0].f_id},
              'jwt_secret_key',
              {expiresIn: '1d'}
            );
            res.cookie('token', token);
            return res.json({loginStatus: true, id: result[0].f_id});
          }
        }
      );
    } else {
      return res.json({loginStatus: false, Error: 'wrong email or password'});
    }
  });
});

router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM t_employee WHERE f_id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false});

    if (result.length === 0) {
      return res.json({Status: false, Error: 'Employee not found'});
    }
    return res.json({Status: true, Result: result});
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: true});
});

export {router as EmployeeRouter};

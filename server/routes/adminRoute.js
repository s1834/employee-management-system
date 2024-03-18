import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
  const sql = 'SELECT * FROM t_login WHERE f_userName = ? AND f_Pwd = ?';
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({loginStatus: false, Error: 'Query error'});
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({role: 'admin', email: email}, 'jwt_secret_key', {
        expiresIn: '1d',
      });
      res.cookie('token', token);
      return res.json({loginStatus: true});
    } else {
      return res.json({loginStatus: false, Error: 'wrong email or password'});
    }
  });
});

router.get('/category', (req, res) => {
  const sql = 'SELECT * FROM category';
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: 'Query Error'});
    return res.json({Status: true, Result: result});
  });
});

router.post('/add_category', (req, res) => {
  const sql = 'INSERT INTO category (`name`) VALUES (?)';
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({Status: false, Error: 'Query Error'});
    return res.json({Status: true});
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.post('/add_employee', upload.single('image'), (req, res) => {
  const sql = `INSERT INTO t_employee (f_name, f_email, f_mobile, f_password, f_salary, f_gender, f_address, f_image, f_category) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({Status: false, Error: 'Query Error'});
    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      hash,
      Number(req.body.salary),
      req.body.gender,
      req.body.address,
      req.file.filename,
      req.body.category_id,
    ];
    con.query(sql, values, (err, result) => {
      if (err) return res.json({Status: false, Error: err.sqlMessage});
      return res.json({Status: true});
    });
  });
});

router.get('/employee', (req, res) => {
  const sql = 'SELECT * FROM t_employee';
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: 'Query Error'});
    return res.json({Status: true, Result: result});
  });
});

router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM t_employee WHERE f_id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: err.sqlMessage});
    return res.json({Status: true, Result: result});
  });
});

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE t_employee SET f_name = ?, f_email = ?, f_mobile = ?, f_salary = ?, f_gender = ?, f_address = ?, f_category = ? WHERE f_id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.mobile,
    req.body.salary,
    req.body.gender,
    req.body.address,
    req.body.category_id,
    id,
  ];

  con.query(sql, values, (err, result) => {
    if (err) return res.json({Status: false, Error: 'Query Error' + err});
    return res.json({Status: true});
  });
});

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM t_employee WHERE f_id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: 'Query Error' + err});
    return res.json({Status: true, Result: result});
  });
});

export {router as adminRouter};

import mysql from 'mysql';
import {MYSQL_USERNAME, MYSQL_PASSWORD} from '../.env';

const con = mysql.createConnection({
  host: 'localhost',
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: 'employee_management_system',
});

con.connect(function (err) {
  if (err) {
    console.log('connection error');
    console.log(err);
  } else {
    console.log('connected');
  }
});

export default con;

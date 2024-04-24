import mysql from "mysql";
import {
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
} from "../.env";

const con = mysql.createConnection({
  host: RDS_HOSTNAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD,
  port: RDS_PORT,
  database: RDS_DB_NAME,
});

con.connect(function (err) {
  if (err) {
    console.log("connection error");
    console.log(err);
  } else {
    console.log("connected");
  }
});

export default con;

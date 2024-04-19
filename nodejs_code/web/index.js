const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const app = express();


console.log("--------------"+process.env.MYSQL_HOST+"-----------------");
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM Student", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});

app.listen(5000, () => console.log("listining on port 5000"));
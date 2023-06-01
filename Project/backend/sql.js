const mysql= require("mysql")

 const db = mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "admin",
    multipleStatements: true, //makes it so that I can make multiple commands in one query
  });

module.exports= db;
  
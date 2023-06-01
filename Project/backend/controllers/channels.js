const db = require("../sql.js");
const date = new Date("YYYY-MM-DD");
const jwt = require("jsonwebtoken");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
// this section focuses on channels

// here we get the list of channels
const getChannels = (req, res) => {
  let sql = `USE project;
      SELECT * FROM channels;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

// here we can add channels it also initializes 
const addChannel = (req, res) => {
    const token = req.cookies.acessToken;

    jwt.verify(token,secretKey,(err,userInfo)=>{
    if (err) return res.status(403).json("Token is wrong!");

    let input = [req.body.channelName,userInfo.id, date];
    let sql = `USE project;
      CREATE TABLE IF NOT EXISTS channels(
        id int unsigned NOT NULL auto_increment,
        channelName varchar(45),
        userId int(11),
        createdAt DATETIME,
        PRIMARY KEY (id)
      );
      INSERT INTO channels(channelName,userId,createdAt)
      VALUES (?); `;
  
    db.query(sql, [input], (err, result) => {
      if (err){
        res.status(400).send("Something went wrong.. please refresh the page")
        console.log(err)
      };
      res.send(result);
    });


    })

};

// get the channel specifically by name. 
const getChannelsByName = (req, res) => {
  let input = [req.params.channelName];
  let sql = `USE project;
      SELECT * FROM channels where channelName=?`;

  db.query(sql, [input], (err, result) => {
    if (err){
      res.status(400).send("Something went wrong.. please refresh the page")
      console.log(err)

    };
    res.send(result);
  });
};

// delete the channel by id (for admin uses )
const deleteChannel = (req, res) => {
  let input = [req.query.removeChannel];
  let sql = `USE project;
  DELETE FROM channels WHERE channels.id= ?;
  `;
  db.query(sql, [input], (err, result) => {
    if (err){
      res.status(400).send("Something went wrong check backend")
      console.log(err)

    };
    res.send(result);
  });
};

module.exports = { getChannels, addChannel, getChannelsByName, deleteChannel };

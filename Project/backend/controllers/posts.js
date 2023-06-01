const db = require("../sql.js");
const jwt = require("jsonwebtoken");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const createPost = (req, res) => {
  const token = req.cookies.acessToken;
  const date = new Date();
  const channleName = req.params.channelName;

  jwt.verify(token, secretKey, (err, userInfo) => {
    if (err) return res.status(403).json("Token is wrong!");

    let input = [req.body.topic, req.body.data, date, userInfo.id, channleName];

    let sql = `USE project;
    CREATE TABLE IF NOT EXISTS posts(
      id int unsigned NOT NULL auto_increment,
      topic varchar(100),
      createdAt datetime,
      data varchar(100),
      userId int(11),
      channelName varchar(100),
      PRIMARY KEY (id)
    );
    INSERT INTO posts (topic,data,createdAt,userId,channelName) 
    VALUES (?);`;

    try{

      db.query(sql, [input], (err, result) => {
        console.log(req.params);
        res.send(channleName);
      });
    }catch(err){
      res.status(409).send("Message was too long! Data needs to be 100 characters long")
      console.log(err)
    }

  });
};

const getPosts = (req, res) => {
  let sql = ` USE project;
  SELECT * FROM posts;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    if (res.status(304)) {
      console.log("same data");
    }
  });
};

const deletePost = (req, res) => {
  let input = [req.params.id];
  let sql = `USE project;
  DELETE FROM posts where posts.id= ? ;`;
  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getPostById = (req, res) => {
  const token = req.cookies.acessToken;
  const id = req.params.id;
  let sql = `USE project;
  SELECT * FROM posts where posts.id=? `;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getUsersPosts = (req, res) => {
  const id = req.params.id;
  let sql = `USE project;
  SELECT * FROM posts where posts.userId=? `;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getPostbyChannelName = (req, res) => {
  let input = [req.params.channelName];

  let sql = ` USE project;
  SELECT * FROM posts where channelName= ?;`;

  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {
  createPost,
  getUsersPosts,
  getPosts,
  deletePost,
  getPostById,
  getPostbyChannelName,
};

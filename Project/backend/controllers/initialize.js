const db = require("../sql.js");

const initializeDb = (req, res) => {
  
      let sql = `create database if not exists project;
      use project;
      CREATE TABLE IF NOT EXISTS users(
        id int unsigned NOT NULL auto_increment,
        postID int unsigned,
        username varchar(100) NOT NULL, 
        email varchar(100) NOT NULL,
        password varchar(100) NOT NULL,
        PRIMARY KEY (id)
      );
      CREATE TABLE IF NOT EXISTS channels(
        id int unsigned NOT NULL auto_increment,
        channelName varchar(45),
        userId int(11),
        createdAt DATETIME,
        PRIMARY KEY (id)
      );
      CREATE TABLE IF NOT EXISTS posts(
        id int unsigned NOT NULL auto_increment,
        topic varchar(100),
        createdAt datetime,
        data varchar(100),
        userId int(11),
        channelName varchar(100),
        PRIMARY KEY (id),
        FULLTEXT fullTextTopic(topic),
        FULLTEXT fullTextData(data)

      );
      CREATE TABLE IF NOT EXISTS comments(
        id int unsigned NOT NULL auto_increment,
        commentData varchar(45),
        userId int(11),
        channelName varchar(45),
        postId varchar(45),
        parentId INT(11),
        createdAt DATETIME,
        PRIMARY KEY (id),
        FULLTEXT (commentData)
      );
      CREATE TABLE IF NOT EXISTS likes(
        id int unsigned NOT NULL auto_increment,
        userId varchar(100),
        postId varchar(100),
        PRIMARY KEY (id)
      );
      
      `;
      db.query(sql, (err, result) => {
        if (err){
          res.status(400).send("CheckErr")
          console.log(err)
        };
        console.log(result)
      });
 
  };

  module.exports = { initializeDb };

  
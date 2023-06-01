const db = require("../sql.js");
const jwt = require("jsonwebtoken");
const secretKey = process.env.REACT_APP_SECRET_KEY;

const createComment = (req, res) => {
  const token = req.cookies.acessToken;
  const channelName = req.params.channelName;
  const postId = req.body.postId;
  const date = new Date();

  jwt.verify(token, secretKey, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is wrong");
    }

    let input = [req.body.data, userInfo.id, channelName, postId,date];
    let sql = `USE project;
    CREATE TABLE IF NOT EXISTS comments(
      id int unsigned NOT NULL auto_increment,
      commentData varchar(45),
      userId int(11),
      channelName varchar(45),
      postId varchar(45),
      createdAt DATETIME,
      PRIMARY KEY (id)
    );
    INSERT INTO comments (commentData,userId,channelName,postId,createdAt) 
    VALUES (?);`;
    db.query(sql, [input], (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
  });
};

// SELECT users.id, comments.data FROM comments INNER JOIN users
// ON comments.id= 1
const getComments = (req, res) => {
  let input = [req.query.postId];
  let sql = ` USE project;
  SELECT c.*, u.id AS userId,username FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ?`;
  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
    if (res.status(304)) {
      console.log("same data");
    }
  });
};


const getCommentsByUserId = (req, res) => {
  let input = [req.query.userId];
  let sql = ` USE project;
  SELECT * from comments where comments.userId=?`;
  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
    if (res.status(304)) {
      console.log("same data");
    }
  });
};

const getReplies = (req, res) => {
  let input = [req.query.parentId];
  let sql = ` USE project;
  SELECT* from comments JOIN users ON (users.id = comments.userId) WHERE comments.parentId = ?;`;
  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
    if (res.status(304)) {
      console.log("same data");
    }
  });
};
const getCommentById = (req, res) => {
  const postId = req.params.postId;
  let sql = `USE project;
    SELECT * FROM comments WHERE postId= ? ;
    `;
  db.query(sql, [postId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteComment= (req,res)=>{
  let input = [req.params.id];
  let sql = `USE project;
  DELETE FROM comments where comments.id= ?;
  DELETE FROM comments where comments.parentId= ${req.params.id}
  `;
  
  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

const createReplyToComment = (req, res) => {
  const token = req.cookies.acessToken;
  const channelName = req.params.channelName;
  const parentId = req.body.parentId;
  const date = new Date();


  jwt.verify(token, secretKey, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is wrong");
    }

    let input = [req.body.reply, userInfo.id, channelName, parentId,date];
    let sql = `USE project;
    INSERT INTO comments (commentData,userId,channelName,parentId,createdAt) 
    VALUES (?);`;
    db.query(sql, [input], (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
  });
};
module.exports = { createComment, getComments, getCommentById,createReplyToComment,getReplies,deleteComment,getCommentsByUserId };

const db = require("../sql.js");
const jwt = require("jsonwebtoken");
const key = process.env.REACT_APP_SECRET_KEY;

const upLike = (req, res) => {
  const token = req.cookies.acessToken;
  const postId = req.body.postId;
  jwt.verify(token, key, (err, user) => {
    if (err) return res.status(403).json("Token is wrong!");

    let input = [user.id, postId];

    let sql = `use project;
        CREATE TABLE IF NOT EXISTS likes(
            id int unsigned NOT NULL auto_increment,
            userId varchar(100),
            postId varchar(100),
            PRIMARY KEY (id)
          );
        
        SELECT * FROM likes where postId="${postId}"and userId= "${user.id}";
        `;

    let sql2 = `use project;
        
        INSERT INTO likes(userId,postId) VALUES (?);
        `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      if(result[2].length===0){
            db.query(sql2, [input], (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
        console.log(result);
      });
      }
      else{
        console.log("Already liked!")
        res.status(200).send("You already liked this post! ")
      }
      
  
    });
  });
};

const getPostLikeCount = (req, res) => {
  const postId = req.query.postId;
  let input = [postId];
  let sql = `USE project;
  SELECT COUNT(*) as number FROM likes where postId=?;`;

  db.query(sql, [input], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
};

const downVote = (req, res) => {
  const token = req.cookies.acessToken;
  const postId = req.query.postId;
  jwt.verify(token, key, (err, user) => {
    if (err) return res.status(403).json("Token is wrong!");

    let sql = `use project;
    DELETE FROM likes WHERE userId= ${user.id} and postId=${postId};
    
    `;

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
  });
};

module.exports = { upLike, getPostLikeCount, downVote };

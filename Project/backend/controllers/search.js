const db = require("../sql.js");

const getSearchQuery = (req, res) => {
  // const tableName= req.query.tableName
  const stringInput = req.query.stringInput;
  // let sql=`USE project;
  // SELECT * FROM ${tableName} WHERE channelName LIKE ${JSON.stringify(`%`+stringInput+`%`)}
  // OR topic LIKE ${JSON.stringify(`%`+stringInput+`%`)}
  // OR data LIKE  ${JSON.stringify(`%`+stringInput+`%`)}

  // `

  let sql = `use project;
    select * from posts where match(posts.topic) against ("${stringInput}" IN NATURAL LANGUAGE MODE) 
    OR match(posts.data) against ("${stringInput}" IN NATURAL LANGUAGE MODE);
    select * from comments where match(comments.commentData) against ("${stringInput}" IN NATURAL LANGUAGE MODE);
    `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

const getMostLiked = (req, res) => {
  let sql = `use project; select postId, count(*) as c FROM likes GROUP BY postId ORDER BY c DESC LIMIT 1;`;

  try {
    db.query(sql, (err, result) => {
      if (result[1].length > 0) {
        let getTable = `SELECT p.*, u.id AS userId,username FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.id =${result[1][0].postId} ;`;
        db.query(getTable, (err, answer) => {
          res.send(answer);
        });
      } else {
        console.log("POST ID is undefined!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getLeastLiked = (req, res) => {
  let sql = `use project; select postId, count(*) as c FROM likes GROUP BY postId ORDER BY c ASC LIMIT 1;`;

  try {
    db.query(sql, (err, result) => {
      if (result[1].length > 0) {
        let getTable = `SELECT p.*, u.id AS userId,username FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.id =${result[1][0].postId} ;`;
        db.query(getTable, (err, answer) => {
          res.send(answer);
        });
      } else {
        console.log("POST ID is undefined!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getLeastPosts = (req, res) => {
  let sql = `use project;
  SELECT userId, COUNT(*) AS c 
  FROM posts 
  GROUP BY userId 
  ORDER BY c DESC
  LIMIT 1;`;

  try {
    db.query(sql, (err, result) => {
      if (result[1].length > 0) {
        let getTable = `SELECT * FROM users WHERE id =${result[1][0].userId} ;`;
        db.query(getTable, (err, answer) => {
          res.send(answer);
        });
      } else {
        console.log("POST ID is undefined!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getMostPosts = (req, res) => {
  let sql = `use project;
  SELECT userId, COUNT(*) AS c 
  FROM posts 
  GROUP BY userId 
  ORDER BY c ASC
  LIMIT 1;`;

  try {
    db.query(sql, (err, result) => {
      if (result[1].length > 0) {
        let getTable = `SELECT * FROM users WHERE id =${result[1][0].userId} ;`;
        db.query(getTable, (err, answer) => {
          res.send(answer);
        });
      } else {
        console.log("POST ID is undefined!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getContentByUser = (req, res) => {
  let input = [req.query.username];
  let sql = `use project; SELECT c.*, u.id AS userId,username FROM posts AS c JOIN users AS u ON (u.id = c.userId) WHERE u.username = ?;`;

  db.query(sql, [input], (err, result) => {
    if (err) {
      res.status(400).send("Error with query!");
    }
    console.log(result[1]);
    res.send(result[1]);
  });
};

module.exports = {
  getSearchQuery,
  getMostLiked,
  getContentByUser,
  getLeastLiked,
  getLeastPosts,
  getMostPosts
};

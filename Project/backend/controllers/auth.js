const db = require("../sql.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cookieParser());
const mysecret = process.env.REACT_APP_SECRET_KEY;

// Main thing about this section is that we focus on
// REGESTERING the user
// LOGGIN IN the user
// AUTHING  the user with JWT tokens
// REMOVING users (strictly for admin use)

const register = (req, res) => {
  let checkIfEmailExists = `use project; SELECT COUNT(*) AS count FROM users WHERE email = "${req.body.email}"; `;

  let sql = `USE project;
      CREATE TABLE IF NOT EXISTS users(
        id int unsigned NOT NULL auto_increment,
        postID int unsigned,
        username varchar(100) NOT NULL, 
        email varchar(100) NOT NULL,
        password varchar(100) NOT NULL,
        PRIMARY KEY (id)
      );
      INSERT INTO users (username,email,password)
      VALUE (?);    `;

  // First check if the email exists
  //If it does --> then retunr that it is in use
  // If it doesnt --> create the account

  bcrypt.hash(req.body.password, 10, (err, hasing) => {
    if (err) {
      console.log(err);
    }

    db.query(checkIfEmailExists, (err, result) => {
      const input = [req.body.username, req.body.email, hasing];

      if (err) throw err;
      else {
        const sqlQueryNumber = JSON.stringify(result[1][0].count);
        if (parseInt(sqlQueryNumber) > 0) {
          console.log("User exists! ");
          res.status(422).send("Email is already in use !");
        } else {
          db.query(sql, [input], (err, answer) => {
            if (err) throw err;
            console.log(answer);
          });
        }
      }
    });
  });
};

const login = (req, res) => {
  let sql = `USE project;
    SELECT * FROM users WHERE email = "${req.body.email}";`;

  // If there is an error, its most likely that the user did
  // not inpuit the correct credentials
  // ELSE --> create a token , sign it , and send it to the cookies
  // Then log the user in !
  db.query(sql, (err, result) => {
    if (err) {
      res.status(401).send("Email or Password is incorrect!");
      console.log(err);
    }
    if (result.length > 0) {
      try {
        bcrypt.compare(
          req.body.password,
          result[1][0].password,
          (err, response) => {
            var data = JSON.parse(JSON.stringify(result[1][0]));
            const acessToken = jwt.sign({ id: data.id }, mysecret);
            res
              .cookie("acessToken", acessToken,{ httpOnly: true })
              .status(200)
              .json({
                data,
                acessToken,
              });
          }
        );
      } catch (err) {
        res.status(401).send("Email or Password is incorrect!");
        console.log(err);
      }
    }
  });
};

// This simply clears everything --> that way no user is logged in after we click logout
const logout = (req, res) => {
  try{
    res
      .clearCookie("acessToken", { secure: true, sameSite: "none" })
      .status(200)
      .json("Logged out and cleared!");

  }catch(err){
    res.send("Error!").status(400)
    console.log(err)
  }
};

// This was added as an error handler + checking if the session is even currently live
// If token isn't valid/not hand shook --> then let me know
// IF it IS valid then go next in the chain --> AKA getuserAuth();
const verifyJWT = (req, res, next) => {
  token = req.headers["x-acess-token"];
  if (!token) {
    res
      .status(400)
      .send("Something happened.. Please logout and login OR login please");
  } else {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// Lets us knoqw if the user / token is auth
const getUserAuth = (req, res, verifyJWT) => {
  res.send("yoooo we in the user AUTh function");
  return true;
};

// Initializes the admin in the project. Makes sure that user 1 is always the below
// "hardcoded" user.
const adminInitialize = (req, res) => {
  let sql = `use project; replace into users(id,username,email,password) values(1,"mezz","test@gmail.com","test");`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Admin added!");
  });
};

// Get a list of ALL teh users in the db
const getListOfUsers = (req, res) => {
  let sql = `use project;
  select * from users;`;

  try {
    db.query(sql, (err, result) => {
      if (err){console.log("error");
      res.status(400).send("Couldnt get users!");
    };
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Couldnt get users!");
    console.log(err);
  }
};

// Remove the user
// if we do remove--> remove the comments and posts related to their userId
const removeUser = (req, res) => {
  let input = [req.query.id];

  let sql = `use project;
  delete from users where id= (?);
  delete from comments where userId= ${req.query.id};
  delete from posts where userId= ${req.query.id};
  `;

  try {
    db.query(sql, [input], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Couldnt delete user!");
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyJWT,
  getUserAuth,
  adminInitialize,
  removeUser,
  getListOfUsers,
};

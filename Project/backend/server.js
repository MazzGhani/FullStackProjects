const express = require("express");
const cors = require("cors"); // need this to specify what port we can load resources from 
const cookieParser = require("cookie-parser"); // need this so that I can save token/backend data and send it to the frontend 
const bodyParser = require("body-parser");  // parses the HTTP request's I'm making and makes it so we can use the data 
const https=require("https");
const fs = require("fs");
const db = require("./sql");


// ROUTES
const postsRoute = require("./routes/posts.js");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const commentsRouter = require("./routes/comments.js");
const channelRoute = require("./routes/channels.js");
const searchRoute = require("./routes/search.js");
const likeRouter = require("./routes/likes.js");
const initializeRouter = require("./routes/initialize.js");




var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

const PORT = 3000;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("Connected!");
});

// Calling ROUTES 
app.use("/posts", postsRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/comments", commentsRouter);
app.use("/channels", channelRoute);
app.use("/search", searchRoute);
app.use("/likes", likeRouter);
app.use("/init", initializeRouter);


app.post("/todo",(req,res)=>{
  const title= req.body.title;
  const description= req.body.description

  let sql= `use project;
  CREATE TABLE IF NOT EXISTS todo(
    id int unsigned NOT NULL auto_increment,
    title varchar(20),
    description varchar(200),
    PRIMARY KEY (id)
  );

  INSERT INTO todo(title,description)
  VALUES ("${title}","${description}");
  `
  db.query(sql,(err,result)=>{
    if(err)throw err
    res.send(result)
  })


})

app.get("/todo",(req,res)=>{
  let sql =`use project;
  select * from todo
  `
  db.query(sql,(err,result)=>{
    if(err)throw err
    res.send(result)
  })
})

// https
//   .createServer(
//     { key: fs.readFileSync('private-key.pem'),
//     cert: fs.readFileSync('public-cert.pem'),
// },
//     app)
//   .listen(PORT, HOST);
//   console.log(`Running on https://${HOST}:${PORT}`);

app.listen(PORT, HOST);

console.log("Backend Connected!");

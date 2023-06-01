const db = require("../sql.js");
const jwt = require('jsonwebtoken')

const getUser = (req,res)=>{
  const id = req.params.id;
  let sql = `USE project;
  SELECT * FROM users where id=? `;

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(id)
  });
}


module.exports = { getUser };

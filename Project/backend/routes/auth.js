const express = require("express");
const {
  login,
  logout,
  register,
  verifyJWT,
  getUserAuth,
  adminInitialize,
  removeUser,
  getListOfUsers,
} = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/userAuth", getUserAuth);
router.get("/", adminInitialize);
router.delete("/", removeUser);
router.get("/allusers", getListOfUsers);

module.exports = router;

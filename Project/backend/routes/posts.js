const express = require("express");
const {
  getPosts,
  createPost,
  getUsersPosts,
  deletePost,
  getPostById,
  getPostbyChannelName,
} = require("../controllers/posts");
const router = express.Router();

router.post("/:channelName", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/ch/:channelName", getPostbyChannelName);
router.get("/usersPosts/:id", getUsersPosts);
router.delete("/delete/:id", deletePost);

module.exports = router;

const express = require("express");
const {
  createComment,
  getComments,
  getCommentById,
  createReplyToComment,
  getReplies,
  deleteComment,
  getCommentsByUserId
} = require("../controllers/comments");
const router = express.Router();

router.post("/:channelName", createComment);
router.post("/:channelName/reply", createReplyToComment);
router.get("/", getComments);
router.get("/reply", getReplies);
router.delete("/delete/:id", deleteComment);
router.get("/:postId", getCommentById);
router.get("/comment/user/userId", getCommentsByUserId);


module.exports = router;

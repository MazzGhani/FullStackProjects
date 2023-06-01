const express = require("express");
const { upLike, getPostLikeCount, downVote } = require("../controllers/likes");
const router = express.Router();

router.post("/", upLike);
router.delete("/", downVote);
router.get("/", getPostLikeCount);

module.exports = router;

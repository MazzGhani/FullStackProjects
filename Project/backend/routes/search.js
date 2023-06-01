const express = require("express");
const { getSearchQuery,getMostLiked,getContentByUser,getLeastLiked,getLeastPosts,getMostPosts } = require("../controllers/search");
const router = express.Router();

router.get("/", getSearchQuery);
router.get("/mostLiked", getMostLiked);
router.get("/leastLiked", getLeastLiked);
router.get("/leastPosts", getLeastPosts);
router.get("/mostPosts", getMostPosts);
router.get("/content", getContentByUser);



module.exports = router;

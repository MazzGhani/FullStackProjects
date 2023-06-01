const express = require("express");
const {
  getChannels,
  addChannel,
  getChannelsByName,
  deleteChannel,
} = require("../controllers/channels");
const router = express.Router();

router.post("/", addChannel);
router.get("/", getChannels);
router.get("/:channelName", getChannelsByName);
router.delete("/", deleteChannel);

module.exports = router;

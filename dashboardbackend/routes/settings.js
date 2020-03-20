const express = require("express");
const {
  getSettings,
  createSettings,
  updateSettings
} = require("../controllers/settings");
const router = express.Router();

router
  .route("/")
  .get(getSettings)
  .post(createSettings)
  .put(updateSettings);

module.exports = router;

const express = require("express");
const router = express.Router();
const { address, userEmail } = require("../Controllers/user.controller");
const userSave = require("../Controllers/userSave.controller");
const uploads = require("../helper/multer");
router.get("/getData", address, userEmail);
router.post("/saveuser", uploads.single("file"), userSave);

module.exports = router;

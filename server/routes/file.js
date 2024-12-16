const express = require("express");
const router = express.Router();
const controller = require("../controllers/file");

router.post("/uploadFile", controller.fileUpload)

module.exports = router;

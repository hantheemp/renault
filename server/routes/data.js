const express = require("express");
const router = express.Router();
const controller = require("../controllers/data");

router.get("/getAllData", controller.getAllData);
router.post("/filterData", controller.filterData);

module.exports = router;

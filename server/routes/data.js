const express = require("express");
const router = express.Router();
const controller = require("../controllers/data");

router.get("/getAllData", controller.getAllData);
router.post("/filterData", controller.filterData);
router.get("/uniqueObjectUAI", controller.uniqueObjectUAI);
router.post("/relatedProgramName", controller.relatedProgramName);

module.exports = router;

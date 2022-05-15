const express = require("express");
const { check } = require("express-validator");
const vmgoControllers = require("../controllers/vmgo-controllers");
const router = express.Router();

router.get("/getVMGOData", vmgoControllers.getVMGOData);
router.patch("/editMission", vmgoControllers.editMission);
router.patch("/editVision", vmgoControllers.editVision);
router.patch("/editGoals", vmgoControllers.editGoals);
router.patch("/editBSITObjectives", vmgoControllers.editBSITObjectives);
router.patch("/editBLISObjectives", vmgoControllers.editBLISObjectives);

module.exports = router;

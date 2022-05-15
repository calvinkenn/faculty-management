const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const VMGO = require("../models/vmgo");

const getVMGOData = async (req, res, next) => {
  const vmgo = await VMGO.find().exec();

  if (!vmgo) {
    return res.json({ vmgo: "not found" });
  }
  res.json({ vmgo: vmgo });
};

const editMission = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { mission, id } = req.body;

  let editMission = await VMGO.findByIdAndUpdate(id, {
    mission,
  });

  const newUpdate = await VMGO.find({ id: id });
  if (editMission) {
    res.status(201).json({ mission: newUpdate, message: "Mission Updated" });
  }
};

const editVision = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { vision, id } = req.body;

  let editVision = await VMGO.findByIdAndUpdate(id, {
    vision,
  });

  const newUpdate = await VMGO.find({ id: id });
  if (editVision) {
    res.status(201).json({ vision: newUpdate, message: "Vision Updated" });
  }
};

const editGoals = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { goals, id } = req.body;

  let editGoals = await VMGO.findByIdAndUpdate(id, {
    goals: goals,
  });

  const newUpdate = await VMGO.find({ id: id });
  if (editGoals) {
    res.status(201).json({ goals: newUpdate, message: "Goals Updated" });
  }
};

const editBSITObjectives = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { bsitObjectives, id } = req.body;

  let editObjectives = await VMGO.findByIdAndUpdate(id, {
    bsitObjectives: bsitObjectives,
  });

  const newUpdate = await VMGO.find({ id: id });
  if (editObjectives) {
    res
      .status(201)
      .json({ objectives: newUpdate, message: "BSIT Objectives Updated" });
  }
};

const editBLISObjectives = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { blisObjectives, id } = req.body;

  let editObjectives = await VMGO.findByIdAndUpdate(id, {
    blisObjectives: blisObjectives,
  });

  const newUpdate = await VMGO.find({ id: id });
  if (editObjectives) {
    res
      .status(201)
      .json({ objectives: newUpdate, message: "BLIS Objectives Updated" });
  }
};

exports.getVMGOData = getVMGOData;
exports.editMission = editMission;
exports.editVision = editVision;
exports.editGoals = editGoals;
exports.editBSITObjectives = editBSITObjectives;
exports.editBLISObjectives = editBLISObjectives;

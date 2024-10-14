const express = require("express");
const noteModel = require("../models/noteModel");
const middleware = require("../middlewares/middleware");
const router = express.Router();

router.post("/addnote", middleware, async (req, res) => {
  let { description, title } = req.body;
  await noteModel.create({
    description,
    title,
    user: req.user._id,
  });
  console.log(req.user._id);
  let note = await noteModel.findOne({ user: req.user._id });
  console.log(note);
  res.send(note);
});

router.get("/fetchnote", middleware, async (req, res) => {
  let user = await noteModel.find({user:req.user._id});
  res.send(user);
});

router.post("/updatenote/:id", middleware, async (req, res) => {
  let { description, title } = req.body;
  let note = await noteModel.findOneAndUpdate(
    { _id: req.params.id },
    { description, title }
  );
  let notes = await noteModel.find({ user: req.user._id });
  res.send(notes);
});

router.post("/deletenote/:id", middleware, async (req, res) => {
  let note = await noteModel.find({ user: req.user._id });
  let notes = await noteModel.findOneAndDelete({
    user: req.user._id,
    _id: req.params.id,
  });
  res.send(note);
});

module.exports = router;

import express from "express";
import gistModel from "../../models/Gists/Gists.js";

const router = express.Router();

router.post("/creategist", async (req, res) => {
  try {
    let gistData = req.body;
    await gistModel.create(gistData);
    res.status(200).json({ msg: "Gist created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getonegist/:id", async (req, res) => {
  try {
    let gistId = req.params.id;
    let gistData = await gistModel.findOne({ _id: gistId });
    res.status(200).json({ gistData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getallgists", async (req, res) => {
  try {
    let gistData = await gistModel.find({});
    res.status(200).json({ gistData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/updategist/:id", async (req, res) => {
  try {
    let gistId = req.params.id;
    let gistData = req.body;
    await gistModel.updateOne({ _id: gistId }, { $set: gistData });
    res.status(200).json({ msg: "Gist updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deletegist/:id", async (req, res) => {
  try {
    let gistId = req.params.id;
    await gistModel.deleteOne({ _id: gistId });
    res.status(200).json({ msg: "Gist deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteallgists", async (req, res) => {
  try {
    await gistModel.deleteMany({});
    res.status(200).json({ msg: "gist database is completely deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
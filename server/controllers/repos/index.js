import express from "express";
import repoModel from "../../models/Repos/Repos.js";

const router = express.Router();

router.post("/createrepo", async (req, res) => {
  try {
    let userData = req.body;
    await repoModel.create(userData);
    res.status(200).json({ msg: "Repository created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getrepo/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let repoData = await repoModel.findOne({_id: userId});
    res.status(200).json({ repoData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getallrepos", async (req, res) => {
  try {
    let repoData = await repoModel.find({});
    res.status(200).json({ repoData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/updaterepo/:id", async (req, res) => {
  try {
    let repoId = req.params.id;
    let repoData = req.body;
    await repoModel.updateOne({ _id: repoId }, { $set: repoData });
    res.status(200).json({ msg: "Repository updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleterepo/:id", async (req, res) => {
  try {
    let repoId = req.params.id;
    await repoModel.deleteOne({ _id: repoId });
    res.status(200).json({ msg: "Repository deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteallrepos", async (req, res) => {
  try {
    await repoModel.deleteMany({});
    res.status(200).json({ msg: "All Repositories deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
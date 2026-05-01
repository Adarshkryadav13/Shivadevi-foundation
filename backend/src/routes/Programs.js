import express from "express";
import Program from "../models/Program.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const programs = await Program.find();
  res.json(programs);
});

router.post("/", async (req, res) => {
  const program = await Program.create(req.body);
  res.json(program);
});

export default router;
import Student from "../models/students.js";
import Mentor from "../models/mentors.js";

import express from "express";

const router = express.Router();

// API to Create Student
router.route("/").post(async (req, res) => {
  try {
    const { name } = req.body;
    const student = new Student({ name });
    await student.save();

    res.status(201).json({ message: `New Student Added to Database` });
  } catch (error) {
    res.status(500).json({ error: `Student Details Invalid` });
  }
});

export default router;

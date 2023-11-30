import Mentor from "../models/mentors.js";
import Student from "../models/students.js";

import express from "express";

const router = express.Router();

// API to Create Mentor
router.route("/").post(async (req, res) => {
  try {
    const { name } = req.body;
    const mentor = new Mentor({ name });
    await mentor.save();

    res.status(201).json({ message: `New Mentor Added to Database` });
  } catch (error) {
    res.status(500).json({ error: `Mentor Details Invalid` });
  }
});

// Assign Students to Mentor
router.route("/:mentorid/students").post(async (req, res) => {
  const { mentorid } = req.params;
  const { studentIds } = req.body;

  try {
    const mentor = await Mentor.findById(mentorid);
    const students = await Student.find({ _id: { $in: studentIds } });

    if (!mentor || students.length !== studentIds.length) {
      return res.status(404).json({ error: "Mentor or students not found" });
    }

    mentor.students.push(...students);
    await mentor.save();

    students.forEach(async (student) => {
      student.mentor = mentor;
      await student.save();
    });

    res.json({ message: "Students assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to assign students" });
  }
});
export default router;

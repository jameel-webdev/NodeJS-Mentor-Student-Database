import Mentor from "../models/mentors.js";
import Student from "../models/students.js";

import express from "express";

const router = express.Router();

// API to Create Mentor
router.route("/").post(async (req, res) => {
  const { name } = req.body;

  try {
    const newMentor = new Mentor({ name });
    const savedMentor = await newMentor.save();

    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// List of mentors and the unassigned students
router.route("/").get(async (req, res) => {
  try {
    const mentors = await Mentor.find();
    const unassignedStudents = await Student.find({ mentor: null });
    res.json({ mentors, unassignedStudents });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assign Students to Mentor
router.route("/:mentorId/assign").put(async (req, res) => {
  const mentorId = req.params.mentorId;
  const studentId = req.body.studentId;

  try {
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ error: "Mentor or student not found" });
    }

    // Assign student to mentor
    mentor.students.push(student);
    student.mentor = mentor;

    await mentor.save();
    await student.save();

    res.json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Show all students for a particular mentor
router.route("/:mentorId/students").get(async (req, res) => {
  const mentorId = req.params.mentorId;

  try {
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

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

    res.status(201).json({ student, message: `New Student Added to Database` });
  } catch (error) {
    res.status(500).json({ error: `Student Details Invalid` });
  }
});

// Assign or Change Mentor for Student
router.route("/:studentId/assign-mentor").put(async (req, res) => {
  const studentId = req.params.studentId;
  const mentorId = req.body.mentorId;

  try {
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ error: "Student or mentor not found" });
    }

    // Remove the student from the previous mentor's list
    if (student.mentor) {
      const previousMentor = await Mentor.findById(student.mentor);
      previousMentor.students.pull(student);
      await previousMentor.save();
    }

    // Assign the student to the new mentor
    mentor.students.push(student);
    student.mentor = mentor;

    await mentor.save();
    await student.save();

    res.json({ student, mentor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Show the previously assigned mentor for a particular student
router.route("/:studentId/previous-mentor").get(async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const previousMentor = await Mentor.findById(student.mentor);

    res.json(previousMentor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import mongoose from "mongoose";

const mentorsSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Mentor = mongoose.model("mentors", mentorsSchema);

export default Mentor;

/* Importing needed packages */
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import mentors from "./routers/mentorsRoute.js";
import students from "./routers/studentsRoute.js";

/* Database Connection */
connectDb();
/* Initiating Express */
const app = express();
const port = process.env.PORT || 6000;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/mentors", mentors);
app.use("/students", students);

/* Listiening On */
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to NodeJS Mentor Student Assigning Database API`,
  });
});
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

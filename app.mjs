import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { updateStudent, addStudent, getAllStudents, getStudentByRollNumber } from "./studentsDb.mjs";
import cookieParser from "cookie-parser";
import User from "./models/user.mjs";
import * as accountController from "./controllers/accountController.mjs";
import LocalStrategy from "passport-local";
import passport from "passport";
import authMiddleware from "./middlewares/auth.mjs";

authMiddleware();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use(passport.initialize());

const dbUrl = "mongodb://localhost:27017/students";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  accountController.profile
);
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  accountController.login
);
app.post("/register", accountController.register);

app.get(
  "/students",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    try {
      const students = await getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Error retriving students" });
    }
  }
);

app.post("/student", async function (req, res) {
  const newStudent = req.body;
  const students = await getAllStudents();
  if (!Array.isArray(newStudent.trainings)) {
    res.status(400).send("Trainings must be Array");
  } else {
    console.log("students::", students)
    const emailValidation = students.find(
      (student) => student.email === newStudent.email
    );
    const rollnoValidation = students.find(
      (student) => student.rollNumber === newStudent.rollNumber
    );
    if (emailValidation) {
      res.status(400).json({ error: "Email address already exist..!" });
    }
    if (rollnoValidation) {
      res.status(400).json({ error: "Roll Number already exist..!" });
    } else {
      addStudent(newStudent);
      // const students = getAllStudents();
      return res.status(200).json(students);
    }
  }
});

app.get("/student/:rollNumber", async function (req, res) {
  const student =  await getStudentByRollNumber(parseInt(req.params.rollNumber))
  setTimeout(() => {
  res.status(200).json(student);
  }, 8000);
});

app.delete("/student/:rollNumber", async function (req, res) {
  const students =  await getAllStudents(parseInt(req.params.rollNumber));
  
  // const students = getAllStudents();
  res.status(200).json(students);
});

app.put("/student/:rollNumber", async function (req, res) {
  const newAttributes = req.body;
  const students = await getAllStudents();
  if (!Array.isArray(newAttributes.trainings)) {
    res.status(400).send("Trainings must be Array");
  } else {
    const studentObj = students.find(
      (student) => student.rollNumber === parseInt(req.params.rollNumber)
    );
    if (studentObj) {
      await updateStudent(req.params.rollNumber, newAttributes);
      res.status(200).json(newAttributes);
    }
  }
});



app.listen(5555);
console.log("Hello 1234");

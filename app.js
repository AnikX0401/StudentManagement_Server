var express = require("express");
const studentsData = require("./students");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const { addStudent } = require("./studentsDb");
const { updateStudent } = require("./studentsDb");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbUrl = "mongodb://localhost:27017/students";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/students", async function (req, res) {
  try {
    res.status(200).json(studentsData);
  } catch (error) {
    res.status(500).json({ error: "Error retriving students" });
  }
});

app.get("/students/level/:level", function (req, res) {
  const level = req.params.level;
  studentsData = studentsData.filter((student) => student.level === level);
  res.status(200).json(studentsData);
});

app.post("/student", function (req, res) {
  const newStudent = req.body;
  if (!Array.isArray(newStudent.trainings)) {
    res.status(400).send("Trainings must be Array");
  } else {
    const emailValidation = studentsData.find(
      (student) => student.email === newStudent.email
    );
    const rollnoValidation = studentsData.find(
      (student) => student.rollNumber === newStudent.rollNumber
    );
    if (emailValidation) {
      res.status(400).json({ error: "Email address already exist..!" });
    }
    if (rollnoValidation) {
      res.status(400).json({ error: "Roll Number already exist..!" });
    } else {
      addStudent(newStudent);
      res.status(200).json(studentsData);
    }
  }
});

app.get("/student/:rollNumber", function (req, res) {
  const student = studentsData.find(
    (student) => student.rollNumber === parseInt(req.params.rollNumber)
  );
  res.status(200).json(student);
});

app.delete("/student/:rollNumber", function (req, res) {
  studentsData = studentsData.filter(
    (student) => student.rollNumber !== parseInt(req.params.rollNumber)
  );
  res.status(200).json(studentsData);
});

app.put("/student/:rollNumber", async function (req, res) {
  const newAttributes = req.body;
  if (!Array.isArray(newAttributes.trainings)) {
    res.status(400).send("Trainings must be Array");
  } else {
    const studentObj = studentsData.find(
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

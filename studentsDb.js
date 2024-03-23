const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: Number,
  address: {
    city: String,
    zipcode: Number,
  },
  trainings: [String],
  level: String,
  email: String,
});

const StudentDb = mongoose.model("studentrecs", studentSchema);
const getAllStudents = async () => {
  const students = await StudentDb.find({});
  console.log("students::", students);
  return students;
};

const addStudentDb = mongoose.model("studentrecs", studentSchema);
const addStudent = async (studentData) => {
  const db = new addStudentDb(studentData);
  const res = await db.save();
  return res;
};

const updateStudentDb = mongoose.model("studentrecs", studentSchema);
const updateStudent = async (rollNumber, update) => {
  console.log("Dtaa:::", rollNumber, update);
  const updatedStudent = await updateStudentDb.findOneAndUpdate(
    { rollNumber: rollNumber },
    { $set: { ...update } },
    { new: true }
  );
  updatedStudent.save();
  return updatedStudent;
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
};

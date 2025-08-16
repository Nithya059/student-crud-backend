// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake "database" (in-memory array)
let students = [];
let idCounter = 1;

// ➡️ Create student (POST)
app.post("/api/students", (req, res) => {
  const { name, age, grade } = req.body;
  const newStudent = { id: idCounter++, name, age, grade };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ➡️ Read all students (GET)
app.get("/api/students", (req, res) => {
  res.json(students);
});

// ➡️ Read single student (GET by id)
app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// ➡️ Update student (PUT)
app.put("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, age, grade } = req.body;
  student.name = name || student.name;
  student.age = age || student.age;
  student.grade = grade || student.grade;

  res.json(student);
});

// ➡️ Delete student (DELETE)
app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent[0]);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:${PORT}');
});
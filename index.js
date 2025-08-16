import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // ✅ Fetch students from backend
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:4000/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // ✅ Add a new student
  const addStudent = async () => {
    if (!name || !age) return alert("Please enter name and age");

    try {
      const res = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      const data = await res.json();
      setStudents([...students, data]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // ✅ Delete student
  const deleteStudent = async (id) => {
    try {
      await fetch('http://localhost:4000/students/${id}', {
        method: "DELETE",
      });
      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Load students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎓 Student CRUD App</h1>

      <h2>Add Student</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>

      <h2>Student List</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.age} years old){" "}
            <button onClick={() => deleteStudent(s.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function StudentDashboard() {
  
  const [availableCourses, setAvailableCourses] = useState([
    { id: 1, code: "CS203", title: "Data Structures", session: "2025-I", ltp: "3-0-2", dept: "CSE", instructor: "Prof. A" },
    { id: 2, code: "MA101", title: "Calculus", session: "2025-I", ltp: "3-1-0", dept: "MATH", instructor: "Dr. B" }
  ]);

  const [studentEnrollments, setStudentEnrollments] = useState([]);

  return (
    <Outlet context={{
      availableCourses,
      setAvailableCourses,
      studentEnrollments,
      setStudentEnrollments
    }}/>
  );
}

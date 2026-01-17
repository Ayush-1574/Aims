
import { Outlet } from "react-router-dom";
import InstructorLayout from "@/layout/InstructorLayout";
import { useState } from "react";

export default function InstructorDashboard() {
console.log("Dashboard Mounted");

const [courses, setCourses] = useState([
  {
    id: 1,
    code: "CS203",
    title: "Data Structures",
    session: "2025-I",
    status: "APPROVED",
    pending: 2,
    enrolled: 18
  },
  {
    id: 2,
    code: "MA101",
    title: "Calculus",
    session: "2025-I",
    status: "PENDING_APPROVAL",
    pending: 0,
    enrolled: 0
  }
]);

const [requests, setRequests] = useState([
  {
    courseId: 1,
    course: { code: "CS203", title: "Data Structures", session: "2025-I" },
    studentId: 101,
    studentName: "Ayush",
    entryNo: "2023CSB018",
    department: "CSE"
  },
  {
    courseId: 1,
    course: { code: "CS203", title: "Data Structures", session: "2025-I" },
    studentId: 102,
    studentName: "Riya",
    entryNo: "2023CSB022",
    department: "CSE"
  }
]);
const [enrolled, setEnrolled] = useState({
  1: [
    {
      studentId: 101,
      studentName: "Ayush",
      entryNo: "2023CSB018",
      department: "CSE",
      grade: "",
      attendance: ""
    },
    {
      studentId: 102,
      studentName: "Riya",
      entryNo: "2023CSB022",
      department: "CSE",
      grade: "B+",
      attendance: "90%"
    }
  ],
  2: []
});

return (
<InstructorLayout>
  <Outlet context={{ courses, setCourses, requests, setRequests, enrolled, setEnrolled }} />
</InstructorLayout>
);
}
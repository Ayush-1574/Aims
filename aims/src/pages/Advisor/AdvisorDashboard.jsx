import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdvisorLayout from "@/layout/AdvisorLayout";

export default function AdvisorDashboard() {
  // Courses offered by instructors
  const [courses, setCourses] = useState([]);

  // Enrollment workflow buckets
  const [pendingInstructor, setPendingInstructor] = useState([]);
  const [pendingAdvisor, setPendingAdvisor] = useState([]);
  const [enrolled, setEnrolled] = useState({}); // courseId -> students[]

  return (
    <AdvisorLayout>
      <Outlet
        context={{
          courses,
          setCourses,
          pendingInstructor,
          setPendingInstructor,
          pendingAdvisor,
          setPendingAdvisor,
          enrolled,
          setEnrolled,
        }}
      />
    </AdvisorLayout>
  );
}

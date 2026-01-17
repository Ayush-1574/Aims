import { createContext, useState } from "react";

export const AcademicContext = createContext(null);

export default function AcademicProvider({ children }) {

  // 3 workflow buckets
  const [pendingInstructor, setPendingInstructor] = useState([]);
  const [pendingAdvisor, setPendingAdvisor] = useState([]);
  const [enrolled, setEnrolled] = useState({});

  // other states (optionally)
  const [studentEnrollments, setStudentEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  return (
    <AcademicContext.Provider value={{
      pendingInstructor,
      setPendingInstructor,
      pendingAdvisor,
      setPendingAdvisor,
      enrolled,
      setEnrolled,
      studentEnrollments,
      setStudentEnrollments,
      availableCourses,
      setAvailableCourses,
    }}>
      {children}
    </AcademicContext.Provider>
  );
}

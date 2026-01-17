import { useOutletContext } from "react-router-dom";

export default function AdvisorCourseStatus() {
  const { courses, pendingInstructor, pendingAdvisor, enrolled } = useOutletContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Course Status Overview</h2>

      {courses.map(c => (
        <div key={c.id} className="p-3 border rounded bg-white">
          <p className="font-semibold">{c.code} — {c.title}</p>
          <p>Status: {c.status}</p>
          <p>Instructor Pending: {pendingInstructor.filter(r => r.courseId === c.id).length}</p>
          <p>Advisor Pending: {pendingAdvisor.filter(r => r.courseId === c.id).length}</p>
          <p>Enrolled: {(enrolled[c.id] || []).length}</p>
        </div>
      ))}
    </div>
  );
}

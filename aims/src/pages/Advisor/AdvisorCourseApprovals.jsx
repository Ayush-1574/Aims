import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdvisorCourseApprovals() {
  const { courses, setCourses } = useOutletContext();

  const pending = courses.filter(c => c.status === "PENDING_ADVISOR");

  const approve = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: "ENROLLMENT_OPEN" } : c
      )
    );
  };

  const reject = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: "REJECTED" } : c
      )
    );
  };

  if (pending.length === 0)
    return <div>No courses pending advisor approval.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Course Approvals</h2>

      {pending.map(c => (
        <div key={c.id} className="p-3 border rounded bg-white flex justify-between">
          <div>
            <p className="font-semibold">{c.code} — {c.title}</p>
            <p className="text-gray-600">Session: {c.session}</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => approve(c.id)}>Approve</Button>
            <Button variant="destructive" onClick={() => reject(c.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

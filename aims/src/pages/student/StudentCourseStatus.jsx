import { Button } from "@/components/ui/button";

export default function StudentCourseStatus({ courses, studentEnrollments, onApply }) {

  const getStatus = (courseId) => {
    const entry = studentEnrollments.find(e => e.courseId === courseId);
    return entry?.status || "AVAILABLE";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Courses</h2>

      {courses.map(c => {
        const status = getStatus(c.id);

        return (
          <div key={c.id} className="p-3 border rounded bg-white flex justify-between items-center">
            <div>
              <p className="font-semibold">{c.code} — {c.title}</p>
              <p className="text-gray-600">Session: {c.session}</p>
              <p className="text-sm">Status: {status}</p>
            </div>

            {status === "AVAILABLE" && (
              <Button onClick={() => onApply(c.id)}>Enroll</Button>
            )}

            {status === "PENDING_INSTRUCTOR" && (
              <span className="text-yellow-600">Pending Instructor</span>
            )}

            {status === "PENDING_ADVISOR" && (
              <span className="text-blue-600">Pending Advisor</span>
            )}

            {status === "ENROLLED" && (
              <span className="text-green-600 font-medium">Enrolled</span>
            )}

            {status === "REJECTED" && (
              <span className="text-red-600 font-medium">Rejected</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

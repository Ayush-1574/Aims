import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdvisorEnrollmentRequests() {
  const { pendingAdvisor, setPendingAdvisor, enrolled, setEnrolled } = useOutletContext();

  const approve = (req) => {
    setPendingAdvisor(prev => prev.filter(r => r.studentId !== req.studentId));

    setEnrolled(prev => ({
      ...prev,
      [req.courseId]: [...(prev[req.courseId] || []), req]
    }));
  };

  const reject = (req) => {
    setPendingAdvisor(prev => prev.filter(r => r.studentId !== req.studentId));
  };

  if (pendingAdvisor.length === 0)
    return <div>No enrollment requests pending.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pending Enrollment Requests</h2>

      {pendingAdvisor.map(req => (
        <div key={req.studentId} className="p-3 border rounded bg-white flex justify-between items-center">
          <div>
            <p className="font-semibold">{req.studentName}</p>
            <p className="text-gray-600">{req.entryNo} — {req.department}</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => approve(req)}>Approve</Button>
            <Button variant="destructive" onClick={() => reject(req)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

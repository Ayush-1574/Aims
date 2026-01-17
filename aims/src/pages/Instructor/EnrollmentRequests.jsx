import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
export default function EnrollmentRequests() {
  const { courses, setCourses, requests, setRequests, enrolled, setEnrolled } = useOutletContext();

  const handleApprove = (req) => {
  // remove from pending list
  setRequests(prev => prev.filter(r => !(r.courseId === req.courseId && r.studentId === req.studentId)));

  // add to enrolled
  setEnrolled(prev => ({
    ...prev,
    [req.courseId]: [...(prev[req.courseId] || []), req]
  }));

  // update counts on courses list
  setCourses(prev =>
    prev.map(c =>
      c.id === req.courseId
        ? { ...c, pending: c.pending - 1, enrolled: c.enrolled + 1 }
        : c
    )
  );
};
const handleReject = (req) => {
  setRequests(prev => prev.filter(r => !(r.courseId === req.courseId && r.studentId === req.studentId)));
  
  setCourses(prev =>
    prev.map(c =>
      c.id === req.courseId
        ? { ...c, pending: c.pending - 1 }
        : c
    )
  );
};


  // group by course
  const grouped = requests.reduce((acc, req) => {
    const key = req.courseId;
    if (!acc[key]) acc[key] = { course: req.course, rows: [] };
    acc[key].rows.push(req);
    return acc;
  }, {});

  const courseKeys = Object.keys(grouped);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pending Enrollment Requests</h2>

      {courseKeys.length === 0 && (
        <div className="text-gray-500">No pending requests.</div>
      )}

      {courseKeys.map((key) => {
        const block = grouped[key];
        const course = block.course;

        return (
          <div key={key} className="border rounded-lg bg-white p-3 space-y-2">

            {/* Course Header */}
            <div className="flex items-center justify-between">
              <div className="font-medium">
                {course.code} — {course.title} ({course.session})
              </div>
              <div className="text-sm text-gray-600">
                {block.rows.length} student(s) requesting
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Entry No</TableHead>
                  <TableHead>Dept</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {block.rows.map((r) => (
                  <TableRow key={r.studentId}>
                    <TableCell>{r.studentName}</TableCell>
                    <TableCell>{r.entryNo}</TableCell>
                    <TableCell>{r.department}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(r)}

                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(r)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}

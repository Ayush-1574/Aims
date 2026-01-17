import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const gradeOptions = ["A", "A-", "B", "B-", "C", "C-", "D", "F", "I"];

export default function EnrolledStudents() {
  const { courseId } = useParams();
  const { enrolled, setEnrolled } = useOutletContext();

  const list = enrolled?.[courseId] || [];

  // local editable copy
  const [edited, setEdited] = useState([]);

  useEffect(() => {
    setEdited(list);
  }, [list, courseId]);

  const updateField = (id, key, value) => {
    setEdited(prev =>
      prev.map(s => (s.studentId === id ? { ...s, [key]: value } : s))
    );
  };

  const handleSave = (id) => {
    const updatedStudent = edited.find(s => s.studentId === id);

    setEnrolled(prev => ({
      ...prev,
      [courseId]: prev[courseId].map(s =>
        s.studentId === id ? updatedStudent : s
      )
    }));

    alert("Student record updated!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Enrolled Students</h2>

      <Table className="bg-white rounded-lg border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Student</TableHead>
            <TableHead>Entry No</TableHead>
            <TableHead>Dept</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead className="text-right">Save</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {edited.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-3 text-gray-500">
                No students enrolled in this course.
              </TableCell>
            </TableRow>
          ) : (
            edited.map((s) => (
              <TableRow key={s.studentId}>
                <TableCell>{s.studentName}</TableCell>
                <TableCell>{s.entryNo}</TableCell>
                <TableCell>{s.department}</TableCell>

                {/* Grade */}
                <TableCell>
                  <Select
                    value={s.grade || ""}
                    onValueChange={(v) => updateField(s.studentId, "grade", v)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Attendance */}
                <TableCell>
                  <Input
                    className="w-24"
                    placeholder="0%"
                    value={s.attendance || ""}
                    onChange={(e) =>
                      updateField(s.studentId, "attendance", e.target.value)
                    }
                  />
                </TableCell>

                {/* Save */}
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => handleSave(s.studentId)}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

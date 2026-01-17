import { useState } from "react";
import { studentCourses } from "@/data/studentCoursesDummy";

export default function StudentRecord() {
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const filteredCourses = showEnrolledOnly
    ? studentCourses.filter(c => c.enrolled)
    : studentCourses;

  return (
    <div className="space-y-4">
      
      <h2 className="text-xl font-semibold">Academics</h2>

      {/* Warning Note */}
      <div className="border border-red-400 bg-red-50 text-red-700 p-3 rounded text-sm">
        <strong>NOTE:</strong> Grades may be pending senate approval. Final academic section records take precedence.
      </div>

      {/* Toggle */}
      <div className="flex justify-end">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showEnrolledOnly}
            onChange={e => setShowEnrolledOnly(e.target.checked)}
          />
          Show only Enrolled
        </label>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        
        {/* Header */}
        <div className="grid grid-cols-7 font-medium bg-gray-100 px-3 py-2 border-b text-sm">
          <div>S#</div>
          <div>Course</div>
          <div>Enrol.</div>
          <div>Status</div>
          <div>Course cat.</div>
          <div>Grade</div>
          <div>Attd.</div>
        </div>

        {/* Rows */}
        {filteredCourses.length === 0 ? (
          <div className="px-3 py-4 text-sm text-gray-600">No courses to show!</div>
        ) : (
          filteredCourses.map((c, i) => (
            <div
              key={c.id}
              className={`grid grid-cols-7 px-3 py-2 text-sm ${
                i % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>{i + 1}</div>
              <div>{c.code} - {c.title} ({c.ltp})</div>
              <div>{c.enrolled ? "Credit" : "-"}</div>
              <div>{c.status}</div>
              <div>{c.category}</div>
              <div>{c.grade}</div>
              <div className="text-blue-600 underline cursor-pointer">{c.attendance}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

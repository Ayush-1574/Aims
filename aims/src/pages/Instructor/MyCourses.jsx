import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function MyCourses() {
  const navigate = useNavigate();
  console.log("CTX:", useOutletContext());
  console.log("RERENDER MyCourses");


  const { courses } = useOutletContext();
console.log("courses from context:", courses);

  const [filters, setFilters] = useState({
    search: "",
    session: "",
    status: ""
  });

  const sessions = ["2025-I", "2025-II", "2026-I"];
  const statuses = ["PENDING_APPROVAL", "APPROVED", "ENROLLMENT_OPEN"];

  const filtered = courses.filter(c => {
    const s1 =
      c.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.title.toLowerCase().includes(filters.search.toLowerCase());

    const s2 = filters.session ? c.session === filters.session : true;
    const s3 = filters.status ? c.status === filters.status : true;
    return s1 && s2 && s3;
  });

  const handleViewRequests = (courseId) => {
    navigate(`/instructor/dashboard/requests`, { state: { courseId } });
  };

  const handleViewEnrolled = (courseId) => {
    navigate(`/instructor/dashboard/enrolled/${courseId}`);
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold">My Offered Courses</h2>

      {/* Filters */}
      <div className="flex gap-3 items-center">
        <Input
          className="w-64"
          placeholder="Search code or title..."
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />

        <Select value={filters.session} onValueChange={(v) => setFilters(prev => ({ ...prev, session: v }))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map(s => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(v) => setFilters(prev => ({ ...prev, status: v }))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(s => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="bg-white rounded-lg border"
          onClick={() => setFilters({ search: "", session: "", status: "" })}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <Table className="bg-white rounded-lg border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pending</TableHead>
            <TableHead>Enrolled</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                No courses found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.code}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.session}</TableCell>
                <TableCell className="font-medium">
                  {c.status === "PENDING_APPROVAL" && (
                    <span className="text-yellow-600">Pending Faculty Approval</span>
                  )}
                  {c.status === "APPROVED" && (
                    <span className="text-green-600">Approved</span>
                  )}
                  {c.status === "ENROLLMENT_OPEN" && (
                    <span className="text-blue-600">Enrollment Open</span>
                  )}
                </TableCell>
                <TableCell>{c.pending ?? 0}</TableCell>
                <TableCell>{c.enrolled ?? 0}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" className = "text-white" onClick={() => handleViewRequests(c.id)}>
                    View Requests
                  </Button>
                  <Button size="sm" className = "text-white" variant="outline" onClick={() => handleViewEnrolled(c.id)}>
                    View Enrolled
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

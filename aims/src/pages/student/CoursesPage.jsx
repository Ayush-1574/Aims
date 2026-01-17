import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const [filters, setFilters] = useState({
    dept: "",
    code: "",
    title: "",
    session: "",
    ltp: "",
    instructor: "",
    status: "",
  });

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleReset = () => {
    setFilters({
      dept: "",
      code: "",
      title: "",
      session: "",
      ltp: "",
      instructor: "",
      status: "",
    });
  };

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">Offered Courses</h2>

      {/* FILTER GRID */}
      <div className="grid grid-cols-7 gap-3 items-center">

        <select
          className="border p-2 rounded"
          value={filters.dept}
          onChange={e => handleChange("dept", e.target.value)}
        >
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="EE">EE</option>
        </select>

        <input
          placeholder="Code"
          className="border p-2 rounded"
          value={filters.code}
          onChange={e => handleChange("code", e.target.value)}
        />

        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={filters.title}
          onChange={e => handleChange("title", e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filters.session}
          onChange={e => handleChange("session", e.target.value)}
        >
          <option value="">Acad Session</option>
          <option>2023-24</option>
          <option>2024-25</option>
        </select>

        <input
          placeholder="L-T-P"
          className="border p-2 rounded"
          value={filters.ltp}
          onChange={e => handleChange("ltp", e.target.value)}
        />

        <input
          placeholder="Instructor"
          className="border p-2 rounded"
          value={filters.instructor}
          onChange={e => handleChange("instructor", e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={e => handleChange("status", e.target.value)}
        >
          <option value="">Status</option>
          <option>Open</option>
          <option>Closed</option>
        </select>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white">
          Search
        </Button>

        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>

      {/* RESULTS */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-semibold mb-2">Results</h3>
        <p className="text-gray-500">Nothing to show yet!</p>
      </div>
    </div>
  );
}

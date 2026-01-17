// src/layout/StudentLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StudentLayout() {
  const navigate = useNavigate();

  const menu = [
    { label: "Offered Courses", path: "/student/dashboard/courses" },
    { label: "Record", path: "/student/dashboard/record" },
  ];

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <aside className="w-56 bg-white border-r shadow-sm flex flex-col">
        <div className="p-4 font-semibold border-b">Student Portal</div>
        <nav className="flex flex-col p-2 gap-1 flex-1">
          {menu.map(m => (
            <NavLink
              key={m.path}
              to={m.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`
              }
            >
              {m.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

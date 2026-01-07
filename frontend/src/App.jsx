import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import ReviewsTable from "./components/ReviewsTable";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              User
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              Admin
            </NavLink>
          </div>
        </nav>

        {/* Pages */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/admin" element={<ReviewsTable />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

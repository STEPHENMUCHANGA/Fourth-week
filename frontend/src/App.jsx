import React, { useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseView from "./pages/CourseView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Home as HomeIcon } from "lucide-react";

function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ✅ Standalone landing page (no navbar, full layout) */}
        <Route path="/" element={<Home />} />

        {/* ✅ All other pages share a layout with navbar and content container */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <nav className="bg-white shadow p-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                  <Link
                    to="/"
                    className="font-extrabold text-lg text-blue-600 hover:text-blue-700"
                  >
                     <HomeIcon className="inline-block w-5 h-5" />
                     SmartLearner
                  </Link>
                  <div className="flex gap-3">
                  </div>
                </div>
              </nav>

              <main className="flex-grow max-w-5xl mx-auto p-6">
                <Routes>
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseView />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <Protected>
                        <Dashboard />
                      </Protected>
                    }
                  />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

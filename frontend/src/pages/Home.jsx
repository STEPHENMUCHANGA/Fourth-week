import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">SmartLearner</h1>
          <nav className="flex gap-6 text-gray-600 font-medium">
            <Link to="/courses" className="hover:text-blue-600 transition">
              Courses
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-between flex-grow max-w-7xl mx-auto px-6 py-16 gap-10">
        {/* LEFT SECTION */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            Learn Smarter, Grow Faster with SmartLearner
          </h2>
          <p className="text-lg text-gray-700">
            Discover high-quality online courses crafted by experts. 
            Track your learning journey, build new skills, and reach your academic goals effortlessly with SmartLearner.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">
            Get Started Today!
          </h2>
          <p className="text-gray-600">Join thousands of learners enhancing their skills and advancing their careers.
            <br />Sign up now and take the first step towards a brighter future!
            <br />It's free and easy to get started.
            <br />No credit card required.
            <br />Unlock your potential with SmartLearner.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800"> 
            Contact
            </h2>
            <p className="text-gray-600">
            For inquiries, support, or feedback, reach out to us at: email:info@smartlearnerke.com or mobile:+254775482195
            </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/courses"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white shadow-inner py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm px-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-blue-600">SmartLearner</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

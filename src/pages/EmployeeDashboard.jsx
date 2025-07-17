import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaClock, FaClipboardList } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 p-6 text-gray-900">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg shadow"
        >
          Logout
        </button>

        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">
          Welcome to Your <span className="text-teal-600">Employee Dashboard</span>
        </h2>

        <p className="text-gray-700 mb-10 text-lg text-center max-w-4xl mx-auto leading-relaxed font-medium">
          <span className="text-gray-900 font-semibold">Manage</span> your 
          <span className="text-teal-700 font-semibold"> daily timesheets</span> and 
          <span className="text-indigo-700 font-semibold"> project assignments</span> with ease and efficiency. Stay organized and focused with all your work details in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link
            to="/employee/timesheet"
            className="flex items-center space-x-5 p-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <FaClock className="text-4xl" />
            <div>
              <p className="text-xl font-semibold">View Timesheet</p>
              <p className="text-sm text-teal-100">Log and review your working hours</p>
            </div>
          </Link>

          <Link
            to="/employee/project"
            className="flex items-center space-x-5 p-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <FaClipboardList className="text-4xl" />
            <div>
              <p className="text-xl font-semibold">My Projects</p>
              <p className="text-sm text-indigo-100">View details of your assigned projects</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

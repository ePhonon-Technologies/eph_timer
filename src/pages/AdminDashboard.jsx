import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const employees = [
    {
      name: "John Doe",
      totalHours: 40,
      assignedDate: "2025-07-01",
      deadline: "2025-07-20",
      status: "In Progress",
    },
    {
      name: "Jane Smith",
      totalHours: 36,
      assignedDate: "2025-07-05",
      deadline: "2025-07-25",
      status: "Completed",
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg shadow"
        >
          Logout
        </button>

        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
          🧑‍💼 Admin <span className="text-indigo-600">Dashboard</span>
        </h2>

        <p className="text-gray-700 mb-10 text-lg text-center max-w-4xl mx-auto leading-relaxed font-medium">
          <span className="text-gray-900 font-semibold">View</span> employee timesheet summaries and
          <span className="text-indigo-700 font-semibold"> track total logged hours</span> with efficiency. Stay informed and manage your workforce with confidence.
        </p>

        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
            <tr>
              <th className="p-4 font-semibold tracking-wide">Employee Name</th>
              <th className="p-4 font-semibold tracking-wide">Total Hours</th>
              <th className="p-4 font-semibold tracking-wide">Assigned Date</th>
              <th className="p-4 font-semibold tracking-wide">Deadline</th>
              <th className="p-4 font-semibold tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.map((emp, index) => (
              <tr key={index} className="hover:bg-gray-100 transition border-b">
                <td className="p-4 text-gray-800">{emp.name}</td>
                <td className="p-4 text-gray-600">{emp.totalHours} hrs</td>
                <td className="p-4 text-gray-600">{emp.assignedDate}</td>
                <td className="p-4 text-gray-600">{emp.deadline}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      emp.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : emp.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <Link
            to="/admin/Employees"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl transition shadow"
          >
            View All Employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

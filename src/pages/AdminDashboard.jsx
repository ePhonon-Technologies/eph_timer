import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([
    {
      project: "Landing Page UI",
      assignedTo: "John Doe",
      designation: "Designer",
      totalHours: 40,
      assignedDate: "2025-07-01T09:00",
      deadline: "2025-07-20T17:00",
      status: "In Progress",
    },
    {
      project: "Backend APIs",
      assignedTo: "Jane Smith",
      designation: "Developer",
      totalHours: 36,
      assignedDate: "2025-07-05T10:00",
      deadline: "2025-07-25T18:00",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const [newAssignment, setNewAssignment] = useState({
    project: "",
    assignedTo: "",
    designation: "",
    totalHours: "",
    assignedDate: "",
    deadline: "",
    status: "Pending",
  });

  const designations = ["Developer", "Designer", "Tester", "SEO"];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
    }
  };

  const handleAssignProject = () => {
    const {
      project,
      assignedTo,
      designation,
      totalHours,
      assignedDate,
      deadline,
      status,
    } = newAssignment;

    if (
      project &&
      assignedTo &&
      designation &&
      totalHours &&
      assignedDate &&
      deadline &&
      status
    ) {
      const newEmp = {
        project,
        assignedTo,
        designation,
        totalHours: parseFloat(totalHours),
        assignedDate,
        deadline,
        status,
      };

      setEmployees([...employees, newEmp]);
      setNewAssignment({
        project: "",
        assignedTo: "",
        designation: "",
        totalHours: "",
        assignedDate: "",
        deadline: "",
        status: "Pending",
      });
      setShowForm(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (indexToRemove) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) {
      const updatedEmployees = employees.filter((_, index) => index !== indexToRemove);
      setEmployees(updatedEmployees);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-indigo-700 to-purple-600 text-white shadow-2xl p-6 flex flex-col justify-between rounded-r-3xl">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Admin Panel</h2>

          <button
            onClick={() => {
              setShowRecords(true);
              setShowForm(false);
            }}
            className="w-full mb-4 px-4 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium rounded-lg shadow-sm"
          >
            👥 View Employee Records
          </button>

          <button
            onClick={() => {
              setShowForm(true);
              setShowRecords(false);
            }}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium rounded-lg shadow-sm"
          >
            ➕ Assign Project
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold rounded-lg shadow"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            🧑‍💼 Admin <span className="text-indigo-600">Dashboard</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            <span className="font-medium">Track and manage</span> employee project assignments effectively.
          </p>

          {/* Main Assignments Table */}
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
              <tr>
                <th className="p-3 font-semibold">Project</th>
                <th className="p-3 font-semibold">Assigned To</th>
                <th className="p-3 font-semibold">Designation</th>
                <th className="p-3 font-semibold">Total Hours</th>
                <th className="p-3 font-semibold">Assigned Date</th>
                <th className="p-3 font-semibold">Deadline</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{emp.project}</td>
                  <td className="p-3">{emp.assignedTo}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.totalHours} hrs</td>
                  <td className="p-3">{new Date(emp.assignedDate).toLocaleString()}</td>
                  <td className="p-3">{new Date(emp.deadline).toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        emp.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Assign Project Form */}
          {showForm && (
            <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-inner relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
                title="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Assign New Project</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="border p-2 rounded"
                  value={newAssignment.project}
                  onChange={(e) => setNewAssignment({ ...newAssignment, project: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Employee Name"
                  className="border p-2 rounded"
                  value={newAssignment.assignedTo}
                  onChange={(e) => setNewAssignment({ ...newAssignment, assignedTo: e.target.value })}
                />
                <select
                  className="border p-2 rounded"
                  value={newAssignment.designation}
                  onChange={(e) => setNewAssignment({ ...newAssignment, designation: e.target.value })}
                >
                  <option value="">-- Select Designation --</option>
                  {designations.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Estimated Total Hours"
                  className="border p-2 rounded"
                  value={newAssignment.totalHours}
                  onChange={(e) => setNewAssignment({ ...newAssignment, totalHours: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="border p-2 rounded"
                  value={newAssignment.assignedDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, assignedDate: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="border p-2 rounded"
                  value={newAssignment.deadline}
                  onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                />
                <select
                  className="border p-2 rounded"
                  value={newAssignment.status}
                  onChange={(e) => setNewAssignment({ ...newAssignment, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignProject}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                  Assign
                </button>
              </div>
            </div>
          )}

          {/* Employee Records Section */}
          {showRecords && (
            <div className="mt-10 bg-white p-6 rounded-xl shadow relative">
              <button
                onClick={() => setShowRecords(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
                title="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                👥 Employee Records
              </h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Project</th>
                    <th className="p-3">Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-3">{emp.assignedTo}</td>
                      <td className="p-3">{emp.designation}</td>
                      <td className="p-3">{emp.project}</td>
                      <td className="p-3">{emp.totalHours} hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

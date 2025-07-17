import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Timesheet = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      project: "Big bike",
      assignedTo: "Developer",
      hours: 4,
      date: "2025-07-01",
      status: "In Progress",
      description: "Working on engine tuning"
    },
    {
      project: "Back log",
      assignedTo: "Tester",
      hours: 12,
      date: "2025-07-03",
      status: "Pending",
      description: "Testing leftover modules"
    },
    {
      project: "UI Cleanup",
      assignedTo: "Designer",
      hours: 8,
      date: "2025-07-05",
      status: "Pending",
      description: "Refining frontend UI"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    project: '',
    assignedTo: '',
    startDateTime: '',
    endDateTime: '',
    hours: '',
    status: '',
    description: ''
  });

  const handleAddEntry = () => {
    const { project, assignedTo, startDateTime, endDateTime, status, description } = newEntry;
    if (project && assignedTo && startDateTime && endDateTime && status && description) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      const diff = (end - start) / (1000 * 60 * 60);

      if (diff <= 0) {
        alert("End time must be after start time.");
        return;
      }

      const entry = {
        project,
        assignedTo,
        date: start.toISOString().split("T")[0],
        hours: parseFloat(diff.toFixed(2)),
        status,
        description
      };

      setData([...data, entry]);
      setNewEntry({
        project: '',
        assignedTo: '',
        startDateTime: '',
        endDateTime: '',
        hours: '',
        status: '',
        description: ''
      });
      setShowForm(false);
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDeleteEntry = (indexToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      setData(data.filter((_, index) => index !== indexToDelete));
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const designations = ["Designer", "Developer", "Tester", "SEO", "Project Manager"];
  const pendingProjects = [...new Set(data.filter(d => d.status === "Pending").map(d => d.project))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 p-8">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl relative">

        {/* Back to Dashboard */}
        <button
          onClick={() => navigate('/employee')}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          title="Back to Dashboard"
        >
          &times;
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-teal-700 tracking-tight">
            🕒 Your <span className="text-gray-800">Timesheet</span> Overview
          </h2>
          <p className="text-gray-700 mt-2 font-bold text-lg max-w-2xl mx-auto">
            Track time across roles and projects effectively.
          </p>
        </div>

        {/* Timesheet Table */}
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
            <tr>
              <th className="p-4 font-semibold">Project</th>
              <th className="p-4 font-semibold">Assigned To</th>
              <th className="p-4 font-semibold">Hours</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((entry, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-100 border-b">
                  <td className="p-4 text-gray-800">{entry.project}</td>
                  <td className="p-4 text-gray-600">{entry.assignedTo}</td>
                  <td className="p-4 text-gray-600">{entry.hours} hrs</td>
                  <td className="p-4 text-gray-600">{entry.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteEntry(index)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td colSpan="6" className="p-4 text-sm text-gray-700 italic">
                    💬 <span className="font-medium">Description:</span> {entry.description}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Add Entry Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-xl transition shadow"
          >
            + Add New Entry
          </button>
        </div>

        {/* Entry Form */}
        {showForm && (
          <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-inner relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
              title="Close Form"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Add Timesheet Entry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="border p-2 rounded"
                value={newEntry.project}
                onChange={(e) => setNewEntry({ ...newEntry, project: e.target.value })}
              >
                <option value="">-- Select Pending Project --</option>
                {pendingProjects.map((proj, idx) => (
                  <option key={idx} value={proj}>{proj}</option>
                ))}
              </select>

              <select
                className="border p-2 rounded"
                value={newEntry.assignedTo}
                onChange={(e) => setNewEntry({ ...newEntry, assignedTo: e.target.value })}
              >
                <option value="">-- Select Designation --</option>
                {["Designer", "Developer", "Tester", "SEO", "Project Manager"].map((role, idx) => (
                  <option key={idx} value={role}>{role}</option>
                ))}
              </select>

              <input
                type="datetime-local"
                className="border p-2 rounded"
                value={newEntry.startDateTime}
                onChange={(e) => setNewEntry({ ...newEntry, startDateTime: e.target.value })}
              />

              <input
                type="datetime-local"
                className="border p-2 rounded"
                value={newEntry.endDateTime}
                onChange={(e) => setNewEntry({ ...newEntry, endDateTime: e.target.value })}
              />

              <select
                className="border p-2 rounded"
                value={newEntry.status}
                onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
              >
                <option value="">-- Select Status --</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>

              <textarea
                placeholder="Project Description"
                className="border p-2 rounded col-span-1 sm:col-span-2"
                rows={4}
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              >
                Save Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timesheet;

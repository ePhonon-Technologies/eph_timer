import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();

  const projects = [
    {
      name: "Website Redesign",
      assignedTo: "John Doe",
      description: "Modernize UI/UX and improve mobile responsiveness.",
      estimatedHours: 60,
      deadline: "2025-08-01",
      status: "In Progress",
    },
    {
      name: "CRM Integration",
      assignedTo: "Jane Smith",
      description: "Integrate customer data with internal CRM tool.",
      estimatedHours: 45,
      deadline: "2025-07-25",
      status: "Pending",
    },
    {
      name: "Mobile App Testing",
      assignedTo: "Ankit Verma",
      description: "Conduct QA and performance testing for the app.",
      estimatedHours: 30,
      deadline: "2025-07-20",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 p-8">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl relative">
        {/* ❌ Cross Button to go back */}
        <button
          onClick={() => navigate('/employee')}
          className="absolute top-6 right-6 text-gray-600 hover:text-red-600 text-2xl font-bold"
          title="Back to Dashboard"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b pb-4">
          📋 Project Details
        </h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition bg-gray-50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">Assigned To:</span> {project.assignedTo}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">Estimated Time:</span> {project.estimatedHours} hours
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">Deadline:</span> {project.deadline}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold text-gray-800">Description:</span> {project.description}
              </p>
              <span
                className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : project.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;

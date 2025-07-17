import React from 'react';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const navigate = useNavigate();

  const employeeData = [
    {
      name: 'John Doe',
      designation: 'Frontend Developer',
      project: 'Website Redesign',
      hours: 40,
    },
    {
      name: 'Jane Smith',
      designation: 'Backend Developer',
      project: 'CRM Integration',
      hours: 38,
    },
    {
      name: 'Ankit Verma',
      designation: 'QA Tester',
      project: 'Mobile App Testing',
      hours: 35,
    },
    {
      name: 'Roshan Singh',
      designation: 'UI/UX Designer',
      project: 'Big bike',
      hours: 42,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl relative">
        {/* Cross Button inside the card */}
        <button
          onClick={() => navigate('/admin')}
          className="absolute top-4 right-6 text-gray-500 hover:text-red-600 text-2xl font-bold"
          title="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b pb-4">
          👥 Employee Records
        </h2>

        <table className="w-full text-left border-collapse mb-8">
          <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wide">Name</th>
              <th className="p-4 text-sm font-semibold tracking-wide">Designation</th>
              <th className="p-4 text-sm font-semibold tracking-wide">Project</th>
              <th className="p-4 text-sm font-semibold tracking-wide">Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employeeData.map((emp, index) => (
              <tr key={index} className="hover:bg-gray-100 transition border-b">
                <td className="p-4 text-gray-800">{emp.name}</td>
                <td className="p-4 text-gray-600">{emp.designation}</td>
                <td className="p-4 text-gray-600">{emp.project}</td>
                <td className="p-4 text-gray-600">{emp.hours} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;

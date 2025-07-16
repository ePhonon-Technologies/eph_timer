import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Timesheet from './pages/Timesheet';
import ProtectedRoute from './components/ProtectedRoute';
import Project from './pages/Project';
import Employees from './pages/employees';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/Employees" element={<ProtectedRoute role="admin"><Employees /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>} />
        <Route path="/employee/timesheet" element={<ProtectedRoute role="employee"><Timesheet /></ProtectedRoute>} />
        <Route path="/employee/project" element={<ProtectedRoute role="employee"><Project /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

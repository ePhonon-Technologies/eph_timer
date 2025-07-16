import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('');

  const navigate = useNavigate();

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password && role) {
      if (role === 'admin') navigate('/admin');
      else navigate('/employee');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (email) {
      const generatedOtp = generateOtp();
      setOtp(generatedOtp);
      setIsOtpSent(true);
      setTimer(30);
      setCanResend(false);
      setIsOtpVerified(false);
      alert(`OTP sent to your email: ${generatedOtp}`);
    } else {
      alert('Please enter your email to reset password.');
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      setIsOtpVerified(true);
      alert('OTP verified. Please set your new password.');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    const newOtp = generateOtp();
    setOtp(newOtp);
    setEnteredOtp('');
    setTimer(30);
    setCanResend(false);
    setIsOtpVerified(false);
    alert(`New OTP sent: ${newOtp}`);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert('Please fill both fields.');
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      alert('Password reset successful. You can now log in.');
      setIsResetMode(false);
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setEmail('');
      setPassword('');
      setEnteredOtp('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerRole) {
      alert('Please fill all fields.');
    } else {
      alert(`New ${registerRole} profile created! You can now log in.`);
      setIsRegisterMode(false);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterRole('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-cyan-500 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6">

        {/* Header Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isRegisterMode
            ? '📝 Create New Profile'
            : isResetMode
            ? isOtpVerified
              ? '🔒 Set New Password'
              : isOtpSent
              ? '🔑 Enter OTP'
              : '🔐 Reset Password'
            : 'Timesheet Management System'}
        </h2>

        {/* Create Profile */}
        {isRegisterMode && (
          <form onSubmit={handleRegister} className="space-y-5 animate-fade-in">
            <div className="border rounded-xl bg-gray-50 p-6 shadow-inner">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">👤 Full Name</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">📧 Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">🔐 Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">👔 Role</label>
                <select
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">-- Select Role --</option>
                  <option value="employee">👷 Employee</option>
                  <option value="admin">🧑‍💼 Admin</option>
                </select>
              </div>

              {registerRole && (
                <div className="mt-3 text-center text-sm text-indigo-600 font-medium">
                  Selected: {registerRole === 'admin' ? '🧑‍💼 Admin' : '👷 Employee'}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Create Profile
            </button>
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setIsRegisterMode(false)}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        {/* Login Mode */}
        {!isRegisterMode && !isResetMode && (
          <>
            <div>
              <label className="block font-semibold text-gray-700 text-sm">👤 Select Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="w-full border px-4 py-2 rounded-xl mt-1"
                defaultValue=""
              >
                <option value="" disabled>Select login type</option>
                <option value="employee">👷 Employee</option>
                <option value="admin">🧑‍💼 Admin</option>
              </select>
            </div>

            {role && (
              <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-right text-sm">
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={() => setIsResetMode(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700"
                >
                  Login
                </button>
                <div className="text-center mt-2">
                  <button
                    type="button"
                    className="text-sm text-indigo-600 hover:underline"
                    onClick={() => setIsRegisterMode(true)}
                  >
                    ➕ Create New Profile
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* Reset Password Flow */}
        {isResetMode && !isOtpSent && !isOtpVerified && (
          <form onSubmit={handleReset} className="space-y-4 animate-fade-in">
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700">
              Send OTP
            </button>
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setIsResetMode(false)}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        {isOtpSent && !isOtpVerified && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="text"
              maxLength={6}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Enter 6-digit OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <div className="text-center text-sm text-gray-500">
              {timer > 0 ? `OTP expires in ${timer}s` : 'OTP expired'}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-teal-600 text-white py-2 rounded-xl"
            >
              Verify OTP
            </button>
            {canResend && (
              <div className="text-center">
                <button
                  onClick={handleResendOtp}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        )}

        {isOtpVerified && (
          <form onSubmit={handlePasswordReset} className="space-y-4 animate-fade-in">
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-xl"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

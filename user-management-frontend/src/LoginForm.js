import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('USER');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Attempting login with email:', email);
      console.log('👤 Selected role:', selectedRole);

      // Step 1: Perform login with the provided credentials (Basic Authentication)
      const response = await axios.post('/User-Service1/users/login', {}, {
        auth: { username: email, password } // Basic Authentication (username:password)
      });

      console.log('✅ Full response object:', response);

      // Step 2: If login is successful, fetch user details from /users/me endpoint
      const basicAuth = btoa(`${email}:${password}`); // Encode credentials in base64

      const meResp = await axios.get('/User-Service1/users/login', {
        headers: {
          'Authorization': `Basic ${basicAuth}`, // Send Basic Auth header
        }
      });

      const user = meResp.data;

      if (!user?.email) {
        console.error('❌ Email is missing! Response was:', user);
        throw new Error('Email not found in login response');
      }

      const userData = {
        id: user.id,
        username: user.name || user.username || '',
        email: user.email,
        role: selectedRole,
        dbRole: user.role,
        status: user.status,
        password, // dev-only
      };

      // Store user data in localStorage and navigate based on role
      localStorage.setItem('userData', JSON.stringify(userData));
      if (rememberMe) localStorage.setItem('rememberMe', 'true');

      onLoginSuccess(userData);
      navigate(selectedRole === 'ADMIN' ? '/admin' : '/');
    } catch (err) {
      console.error('❌ Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage); // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">NETFLIX</h1>

        {/* Error Display */}
        {error && (
          <div className="login-error">
            {/* If error is an object, stringify it for display */}
            {typeof error === 'object' ? JSON.stringify(error, null, 2) : error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Login as
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => {
                console.log('👤 Role changed to:', e.target.value);
                setSelectedRole(e.target.value);
              }}
              className="form-input form-select"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button type="button" className="google-button" disabled={loading}>
            <FaGoogle className="google-icon" />
            Login with Google
          </button>
        </form>

        <div className="signup-section">
          <Link to="/register" className="signup-link">
            New to Netflix? Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

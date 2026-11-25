  import React, { useState, useEffect } from 'react';
  import { useNavigate, Link } from 'react-router-dom'; // Import Link
  import axios from 'axios';
  import { FaGoogle } from 'react-icons/fa';
  import './login.css';

  const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('USER');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle login logic
    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        console.log(' Attempting login with email:', email);
        console.log(' Selected role:', selectedRole);

        // Perform login with Basic Authentication (sending credentials in headers)
        const basicAuth = btoa(`${email}:${password}`); // Base64 encoding for basic auth

        // Step 1: Send login request with Basic Authentication
        const response = await axios.post(
          '/user-service1/users/login', 
          {},
          {
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('Login Response:', response);

        // Step 2: Fetch user details after successful login
        const userResp = await axios.get('/user-service1/users/me', {
          headers: {
            'Authorization': `Basic ${basicAuth}` // Send credentials in header for authenticated user
          }
        });

        const user = userResp.data;

        if (!user?.email) {
          console.error(' Email is missing! Response was:', user);
          throw new Error('Email not found in login response');
        }

        // Correct the role value from the backend response, instead of using selectedRole
        const userData = {
          id: user.id,
          username: user.name || user.username || '',
          email: user.email,
          role: user.role, // Use role from backend response
          dbRole: user.role, // Store the backend role
          status: user.status,
          password, // Only for dev, make sure to remove this in production
        };

        // Store user data in localStorage and navigate based on role
        localStorage.setItem('userData', JSON.stringify(userData));
        if (rememberMe) localStorage.setItem('rememberMe', 'true');

        onLoginSuccess(userData);

        // Check if the role is ADMIN, if yes navigate to Admin Dashboard
        const normalizedRole = userData.role.replace('ROLE_', ''); // Normalize to 'ADMIN' or 'USER'

        if (normalizedRole === 'ADMIN') {
          navigate('/admin-main-page'); // Redirect to Admin Dashboard
        } else {
          navigate('/'); // Redirect to Regular Dashboard
        }
      } catch (err) {
        console.error(' Login error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Login failed';
        setError(errorMessage); // Show error message to user
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      console.log("Login component mounted");
    }, []);

    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">MINIFLIX</h1>

          {/* Error Display */}
          {error && (
            <div className="login-error">
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

                  {/* Google Login Redirect Link */}
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=http://localhost:3000/auth/google/callback&response_type=code&scope=profile%20email`}
            className="google-button"
            disabled={loading}
          >
            <FaGoogle className="google-icon" />
            Login with Google
          </a>
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

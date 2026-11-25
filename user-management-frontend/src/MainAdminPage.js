import React, { useState, useEffect, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './mainAdminPage.css'; // Your CSS

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MainAdminPage = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state for profile menu
  const chartRef = useRef(null); // Reference to the chart instance
  const navigate = useNavigate(); // Initialize useNavigate

  // Dummy data for the charts
  const chartData = {
    labels: ['Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30', 'Feb 01'],
    datasets: [
      {
        label: 'Watch Time (Hours)',
        data: [5, 6, 4, 7, 8, 5],
        fill: false,
        borderColor: '#22d3ee',
        tension: 0.1,
      },
    ],
  };

  const viewsData = {
    labels: ['Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30', 'Feb 01'],
    datasets: [
      {
        label: 'Views',
        data: [120, 150, 130, 170, 180, 160],
        backgroundColor: '#3b82f6',
        borderRadius: 5,
      },
    ],
  };

  const devicesData = {
    labels: ['Mobile', 'Tablet', 'Computer'],
    datasets: [
      {
        label: 'Devices Used',
        data: [15, 5, 50],
        backgroundColor: '#34d399',
        borderRadius: 5,
      },
    ],
  };

  useEffect(() => {
    // Destroy the chart instance if it exists, to prevent canvas reuse issues
    const chartInstance = chartRef.current.chartInstance;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []); // Only run when component mounts/unmounts

  const username = 'Admin'; 
  const email = 'admin@gmail.com'; 
  const role = 'ROLE_ADMIN'; 

  // Handle logout
  const handleLogout = () => {
    setIsDropdownOpen(false);
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <div className="mainadminpage-sidebar">
        <div className="sidebar-accent"></div>
        <h2 className="sidebar-title">MINIFLIX</h2>
        <p className="admin-badge">ADMIN</p>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <button
              onClick={() => {
                setActiveTab('main');
                navigate('/admin'); // Navigate to Main Page
              }}
              className={`sidebar-link ${activeTab === 'main' ? 'active' : ''}`} // Set active class conditionally
            >
              <span className="sidebar-dot"></span>
              <span>Main page</span>
            </button>
          </li>
          
          <li className="sidebar-item">
            <button
              onClick={() => navigate('/admin')}
              className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Users</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => navigate('/admin/manage-categories')}
              className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Categories</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => navigate('/admin/content')}
              className={`sidebar-link ${activeTab === 'content' ? 'active' : ''}`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Content</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => navigate('/admin/subscription')}
              className={`sidebar-link ${activeTab === 'subscription' ? 'active' : ''}`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Subscription</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="admin-content-area">
        {/* Top Bar */}
        <div className="top-bar">
          <h1 className="page-title">
            {activeTab === 'users' ? 'Manage Users' : 'Coming Soon'}
          </h1>

          <div className="user-profile">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="profile-button"
            >
              <div className="profile-info">
                <p className="profile-name">{username}</p>
                <span className="profile-role">{role}</span>
              </div>
              <div className="profile-avatar">
                <span>{username.charAt(0).toUpperCase()}</span>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Admin Details</div>
                <div className="dropdown-item">Email: {email}</div>
                <div className="dropdown-item">Role: {role}</div>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-section">
          <h3>Watch Time Breakdown</h3>
          <Line ref={chartRef} data={chartData} />
        </div>

        <div className="chart-section">
          <h3>Views Per Day</h3>
          <Bar data={viewsData} />
        </div>

        <div className="chart-section">
          <h3>Devices Used</h3>
          <Bar data={devicesData} />
        </div>

        {/* Most Watched Section */}
        <div className="most-watched-section">
          <h3>Your most watched this week:</h3>
          <div className="movies-list">
            <div className="movie-item">
              <span className="movie-rank">1.</span> Chilling Adventures of Sabrina
            </div>
            <div className="movie-item">
              <span className="movie-rank">2.</span> Big Mouth
            </div>
            <div className="movie-item">
              <span className="movie-rank">3.</span> Sex Education
            </div>
          </div>

          <div className="devices-used">
            <h4>Devices Used</h4>
            <div className="device-item">
              <span>Mobile:</span> 15%
            </div>
            <div className="device-item">
              <span>Tablet:</span> 5%
            </div>
            <div className="device-item">
              <span>Computer:</span> 50%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdminPage;

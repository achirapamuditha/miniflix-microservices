import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import brooklynNine from './images/brooklyn-nine.jpg';
import extraction from './images/extraction-1.jpeg';
import readyPlayerOne from './images/Ready-Player-One-En-serio.jpeg';
import redNotice from './images/RED-NOTICE.jpg';
import shadowAndBone from './images/shadow-and-bone-scaled.jpg';
import nightAgent from './images/the-night-agent-netflix-series-1200x675.jpg';
import './dashboard.css';

const Dashboard = ({ userData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Movies data
  const movies = [
    { name: 'Shadow and Bone', image: shadowAndBone },
    { name: 'The Night Agent', image: nightAgent },
    { name: 'Brooklyn Nine-Nine', image: brooklynNine },
    { name: 'Ready Player One', image: readyPlayerOne },
    { name: 'Red Notice', image: redNotice },
    { name: 'Extraction', image: extraction },
  ];

  // Get stored user from localStorage or fall back to empty object
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem('user') || localStorage.getItem('userData') || localStorage.getItem('loggedUser');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(userData ?? getStoredUser() ?? {});

  // Effect for setting user
  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else {
      const stored = getStoredUser();
      if (stored) setCurrentUser(stored);
    }
  }, [userData]);

  const username = currentUser?.username || "Guest";
  const email = currentUser?.email || "N/A";
  const role = currentUser?.role || "USER";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('loggedUser');
    setIsDropdownOpen(false);
    window.location.href = "/login";
  };

  // Filter movies based on search query
  useEffect(() => {
    setFilteredMovies(
      movies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="sidebar-accent"></div>
        <h2 className="sidebar-title">MINIFLIX</h2>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/ContentPage" className="sidebar-link">
              
              <span>Content</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/subscription" className="sidebar-link">
             
              <span>Subscription</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/coming-soon" className="sidebar-link">
             
              <span>Coming Soon</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="content-area">
        <div className="top-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
              </svg>
            </div>
          </div>

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
                <div className="dropdown-header">User Details</div>
                <div className="dropdown-item">Email: {email}</div>
                <div className="dropdown-item">Role: {role}</div>
                <button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="content-title">Lastest Releases</h3>

        <div className="movies-grid">
          {filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="movie-card card-float"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="movie-image-container">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="movie-image"
                />
                <div className="movie-badge">Trailer</div>
              </div>
              <p className="movie-title">{movie.name}</p>

              <div className="movie-footer">
                <div className="movie-info">
                  <div className="movie-icon">
                    {movie.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="movie-name-short">{movie.name.split(' ')[0]}</div>
                </div>

                <div className="movie-actions">
                  <Link to={`/watch/${movie.name}`} className="btn-watch">Watch</Link>  {/* Link for Watch */}
                  <Link to={`/info/${movie.name}`} className="btn-info">Info</Link>    {/* Link for Info */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link and useNavigate are imported
import tigerKing from './images/images.jpeg';
import brooklynNine from './images/brooklyn-nine.jpg';
import extraction from './images/extraaction.jpg';
import redNotice from './images/RED-NOTICE.jpg';
import AmandaKnox from './images/fec1f0e9-3df6-4da0-930f-e531326bc31e.jpeg';
import Citizenfour from './images/maxresdefault.jpg';
import office from './images/download.jpeg';
import familyguy from './images/NiceGuys.jpeg';
import Theoldguard from './images/1_rdKbbKt00Oizg6KctutXDg.jpg';
import InyourDreams from './images/in_your_dreams_sr_exclusives_interview.jpeg';
import Avatar from './images/Screen+Shot+2023-04-14+at+1.42.58+PM.jpeg';
import Roofman from './images/images.jpg';

import './ContentPage.css';

const ContentPage = ({ userData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getStoredUser = () => {
    try {
      const raw =
        localStorage.getItem('user') ||
        localStorage.getItem('userData') ||
        localStorage.getItem('loggedUser');
      if (!raw) return null;
      if (typeof raw === 'string') {
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(userData ?? getStoredUser() ?? {});

  useEffect(() => {
    if (userData && Object.keys(userData).length) {
      setCurrentUser(userData);
      return;
    }
    const stored = getStoredUser();
    if (stored) setCurrentUser(stored);
  }, [userData]);

  const username = currentUser?.username || 'User';
  const email = currentUser?.email || '';
  const role = currentUser?.role || 'USER';

  const handleLogout = () => {
    setIsDropdownOpen(false);
    window.location.href = '/login';
  };

  const goToDashboard = () => navigate('/');

  const categories = [
    { name: 'Documentaries', items: ['Tiger King', 'Amanda Knox', 'Citizenfour', 'In your Dreams'] },
    { name: 'Comedies', items: ['The Office', 'Brooklyn Nine-Nine', 'Family Guy', 'RoofMan'] },
    { name: 'Action', items: ['Extraction', 'Red Notice', 'The Old Guard', 'Avatar 2'] }
  ];

  const filteredItems = (items) =>
    items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">NETFLIX</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/content" className="sidebar-link">Content</Link>
          </li>
          <li>
            <Link to="/subscription" className="sidebar-link">Subscription</Link>
          </li>
          <li>
            <Link to="/coming-soon" className="sidebar-link">Coming Soon</Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button onClick={goToDashboard} className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-area">
        {/* Search Bar */}
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">User Details</div>
                <div className="dropdown-item">Email: {email || 'N/A'}</div>
                <div className="dropdown-item">Role: {role}</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <h3 className="content-title">Content</h3>

        {categories.map((category, idx) => (
          <div key={idx} className="category-section">
            <h2 className="category-title">{category.name}</h2>

            <div className="movies-grid">
              {filteredItems(category.items).map((item, index) => {
                let imageSrc;
                switch (item) {
                  case 'Tiger King': imageSrc = tigerKing; break;
                  case 'Amanda Knox': imageSrc = AmandaKnox; break;
                  case 'Citizenfour': imageSrc = Citizenfour; break;
                  case 'The Office': imageSrc = office; break;
                  case 'Brooklyn Nine-Nine': imageSrc = brooklynNine; break;
                  case 'Family Guy': imageSrc = familyguy; break;
                  case 'Extraction': imageSrc = extraction; break;
                  case 'Red Notice': imageSrc = redNotice; break;
                  case 'The Old Guard': imageSrc = Theoldguard; break;
                  case 'In your Dreams': imageSrc = InyourDreams; break;
                  case 'Avatar 2': imageSrc = Avatar; break;
                  case 'RoofMan': imageSrc = Roofman; break;
                  default: imageSrc = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }

                return (
                  <div key={index} className="movie-card">
                    <div className="movie-image-container">
                      <img src={imageSrc} alt={item} className="movie-image" />
                      <div className="movie-badge">Trailer</div>
                    </div>
                    <p className="movie-title">{item}</p>
                    <div className="movie-footer">
                      <div className="movie-info">
                        <div className="movie-icon">
                          {item.charAt(0).toUpperCase()}
                        </div>
                        <div className="movie-name-short">{item.split(' ')[0]}</div>
                      </div>
                      <div className="movie-actions">
                        <Link to={`/watch/${item}`} className="btn-watch">Watch</Link>
                        <Link to={`/info/${item}`} className="btn-info">Info</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;

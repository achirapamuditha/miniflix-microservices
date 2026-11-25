import React, { useState } from 'react';
import './ComingSoonPage.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate

// Import images from the local images folder
import avengers from './images/Avengers.jpg';
import TheAngryBirds from './images/angrybirds.jpg';
import Frozen3 from './images/frozen.jpg';
import FastXPart2 from './images/fastX.jpg';

// Sample upcoming movies data
const upcomingMovies = [
  {
    title: 'Avengers: Doomsday',
    image: avengers, // Use the imported image variable
    releaseDate: '2026-12-20',
  },
  {
    title: 'The Angry Birds Movie 3',
    image: TheAngryBirds, // Use the imported image variable
    releaseDate: '2027-05-05',
  },
  {
    title: 'Frozen 3',
    image: Frozen3, // Use the imported image variable
    releaseDate: '2027-06-14',
  },
  {
    title: 'Fast X: Part 2',
    image: FastXPart2, // Use the imported image variable
    releaseDate: '2027-07-10',
  },
];

const ComingSoonPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAddToWishlist = (movie) => {
    setWishlist((prevWishlist) => [...prevWishlist, movie]);
  };

  const handleRemoveFromWishlist = (movieToRemove) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((movie) => movie.title !== movieToRemove.title)
    );
  };

  // Function to navigate to dashboard
  const goToDashboard = () => {
    navigate("/"); // Navigate to the dashboard
  };

  return (
    <div className="coming-soon-page">
      {/* Sidebar */}
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
        {/* Footer with back button */}
        <div className="sidebar-footer">
          <button onClick={goToDashboard} className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <div className="movies-grid">
          {upcomingMovies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <div
                className="movie-image"
                style={{ backgroundImage: `url(${movie.image})` }}
              >
                <div className="overlay"></div> {/* Overlay for visual effect */}
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.releaseDate}</p>
                <button
                  className="btn-more-info"
                  onClick={() => handleAddToWishlist(movie)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Section */}
        <div className="wishlist">
          <h2>Wishlist</h2>
          <ul>
            {wishlist.length > 0 ? (
              wishlist.map((movie, index) => (
                <li key={index}>
                  {movie.title}
                  <button
                    className="btn-remove"
                    onClick={() => handleRemoveFromWishlist(movie)}
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p>No movies in wishlist</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

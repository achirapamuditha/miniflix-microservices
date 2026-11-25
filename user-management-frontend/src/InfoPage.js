import React from 'react';
import { useParams, Link } from 'react-router-dom';  // Make sure Link is imported
import './InfoPage.css';

import brooklynNine from './images/brooklyn-nine.jpg';
import extraction from './images/extraction-1.jpeg';
import readyPlayerOne from './images/Ready-Player-One-En-serio.jpeg';
import redNotice from './images/RED-NOTICE.jpg';
import shadowAndBone from './images/shadow-and-bone-scaled.jpg';
import nightAgent from './images/the-night-agent-netflix-series-1200x675.jpg';
import tigerKing from './images/images.jpeg';
import AmandaKnox from './images/fec1f0e9-3df6-4da0-930f-e531326bc31e.jpeg';
import Citizenfour from './images/maxresdefault.jpg';
import office from './images/download.jpeg';
import familyguy from './images/NiceGuys.jpeg';
import Theoldguard from './images/1_rdKbbKt00Oizg6KctutXDg.jpg';
import InyourDreams from './images/in_your_dreams_sr_exclusives_interview.jpeg';
import Avatar from './images/Screen+Shot+2023-04-14+at+1.42.58+PM.jpeg';
import Roofman from './images/images.jpg';

const InfoPage = () => {
  const { movieName } = useParams(); // Get the movie name from the URL

  // Movie data for all movies with image paths and YouTube links
  const movieDetails = {
    'Shadow and Bone': {
      description: 'A young soldier discovers a power that could unite her country.',
      image: shadowAndBone,
      youtubeLink: 'https://www.youtube.com/watch?v=b1WHQTbJ7vE',
      rating: 'TV-14',
      year: 2021,
      duration: '2 Seasons',
      genre: 'Fantasy, Drama',
      createdBy: 'Leigh Bardugo',
    },
    'The Night Agent': {
      description: 'A thriller about a secret service agent who uncovers a conspiracy.',
      image: nightAgent,
      youtubeLink: 'https://www.youtube.com/watch?v=YDbnY9Obsfs',
      rating: 'TV-MA',
      year: 2023,
      duration: '1 Season',
      genre: 'Thriller, Drama',
      createdBy: 'Shawn Ryan',
    },
    'Brooklyn Nine-Nine': {
      description: 'A comedic cop series featuring detective Jake Peralta.',
      image: brooklynNine,
      youtubeLink: 'https://www.youtube.com/watch?v=sEOuJ4z5aTc',
      rating: 'TV-14',
      year: 2013,
      duration: '8 Seasons',
      genre: 'Comedy, Crime',
      createdBy: 'Michael Schur, Dan Goor',
    },
    'Ready Player One': {
      description: 'A young man enters a virtual reality game to find a fortune.',
      image: readyPlayerOne,
      youtubeLink: 'https://www.youtube.com/watch?v=cSp1dM2Vj48',
      rating: 'PG-13',
      year: 2018,
      duration: '2h 20m',
      genre: 'Adventure, Sci-Fi',
      createdBy: 'Steven Spielberg',
    },
    'Red Notice': {
      description: 'A world-class art thief teams up with an FBI agent to catch a conman.',
      image: redNotice,
      youtubeLink: 'https://www.youtube.com/watch?v=Pj0wz7zu3Ms',
      rating: 'PG-13',
      year: 2021,
      duration: '1h 58m',
      genre: 'Action, Comedy, Crime',
      createdBy: 'Rawson Marshall Thurber',
    },
    'Extraction': {
      description: 'A mercenary must rescue a crime lord’s kidnapped son.',
      image: extraction,
      youtubeLink: 'https://www.youtube.com/watch?v=L6P3nI6VnlY',
      rating: 'R',
      year: 2020,
      duration: '1h 57m',
      genre: 'Action, Thriller',
      createdBy: 'Sam Hargrave',
    },
    'Tiger King': {
      description: 'A docuseries about the world of big cat breeding and its eccentric characters.',
      image: tigerKing,
      youtubeLink: 'https://www.youtube.com/watch?v=acTdxsoa428',
      rating: 'R',
      year: 2020,
      duration: '7 Episodes',
      genre: 'Documentary, Crime',
      createdBy: 'Eric Goode, Rebecca Chaiklin',
    },
    'Amanda Knox': {
      description: 'A documentary about the Amanda Knox case and the world of crime investigation.',
      image: AmandaKnox,
      youtubeLink: 'https://www.youtube.com/watch?v=acTdxsoa428',
      rating: 'R',
      year: 2016,
      duration: '1h 32m',
      genre: 'Documentary, Crime',
      createdBy: 'Rod Blackhurst, Brian McGinn',
    },
    'Citizenfour': {
      description: 'A documentary about the whistleblower Edward Snowden and the revelations of mass surveillance.',
      image: Citizenfour,
      youtubeLink: 'https://www.youtube.com/watch?v=JQf0km-xWOU',
      rating: 'R',
      year: 2014,
      duration: '1h 53m',
      genre: 'Documentary, Thriller',
      createdBy: 'Laura Poitras',
    },
    'The Office': {
      description: 'A comedic TV series about the everyday work lives of office employees.',
      image: office,
      youtubeLink: 'https://www.youtube.com/watch?v=8g7pnK8hzQg',
      rating: 'TV-14',
      year: 2005,
      duration: '9 Seasons',
      genre: 'Comedy',
      createdBy: 'Greg Daniels, Ricky Gervais, Stephen Merchant',
    },
    'Family Guy': {
      description: 'An animated comedy series that follows the Griffin family and their crazy adventures.',
      image: familyguy,
      youtubeLink: 'https://www.youtube.com/watch?v=sAO_XMNMM9g',
      rating: 'TV-14',
      year: 1999,
      duration: '19 Seasons',
      genre: 'Comedy, Animation',
      createdBy: 'Seth MacFarlane',
    },
    'The Old Guard': {
      description: 'A group of immortal mercenaries are discovered and have to fight to protect their existence.',
      image: Theoldguard,
      youtubeLink: 'https://www.youtube.com/watch?v=xdKzUoP4Y1M',
      rating: 'R',
      year: 2020,
      duration: '2h 5m',
      genre: 'Action, Drama, Sci-Fi',
      createdBy: 'Gina Prince-Bythewood',
    },
    'In your Dreams': {
      description: 'A romantic comedy that explores the concept of dreams and reality.',
      image: InyourDreams,
      youtubeLink: 'https://www.youtube.com/watch?v=IG1p9fhNIks',
      rating: 'PG',
      year: 2020,
      duration: '1h 45m',
      genre: 'Comedy, Romance',
      createdBy: 'Not Available',
    },
    'Avatar 2': {
      description: 'The next chapter in the Avatar universe, continuing the story of Jake and Neytiri.',
      image: Avatar,
      youtubeLink: 'https://www.youtube.com/watch?v=a8O0gN6dFno',
      rating: 'PG-13',
      year: 2022,
      duration: '3h 12m',
      genre: 'Action, Adventure, Fantasy',
      createdBy: 'James Cameron',
    },
    'RoofMan': {
      description: 'A movie about a man’s adventures in a big city, set in the roof of skyscrapers.',
      image: Roofman,
      youtubeLink: 'https://www.youtube.com/watch?v=EXAMPLE',
      rating: 'R',
      year: 'Coming Soon',
      duration: 'N/A',
      genre: 'Action, Adventure',
      createdBy: 'Coming Soon',
    },
  };

  // Get the movie details based on movie name
  const movie = movieDetails[movieName] || {
    description: 'No description available.',
    image: 'default-image.jpg', // Default image URL
    youtubeLink: 'https://www.youtube.com', // Default link
    rating: 'N/A',
    year: 'N/A',
    duration: 'N/A',
    genre: 'N/A',
    createdBy: 'N/A',
  };

  return (
    <div className="info-page">
      <div className="info-container">
        <div className="left-section">
          <img src={movie.image} alt={movieName} className="movie-poster" />
        </div>
        <div className="right-section">
          <h1>{movieName}</h1>
          <div className="movie-rating">
            <span>{movie.rating}</span> ⭐
          </div>
          <div className="movie-details">
            <div><strong>Year:</strong> {movie.year}</div>
            <div><strong>Duration:</strong> {movie.duration}</div>
            <div><strong>Genre:</strong> {movie.genre}</div>
            <div><strong>Created By:</strong> {movie.createdBy}</div>
          </div>
          <div className="movie-description">
            <p>{movie.description}</p>
          </div>
          <div className="action-buttons">
            <button className="btn-play">
              <a href={movie.youtubeLink} target="_blank" rel="noopener noreferrer">Play</a>
            </button>
          </div>
        </div>
      </div>
      <div className="more-like-this">
        <h3>More Like This</h3>
        <div className="similar-movies">
          <img src={extraction} alt="Extraction" className="similar-movie" />
          <img src={readyPlayerOne} alt="Ready Player One" className="similar-movie" />
          <img src={redNotice} alt="Red Notice" className="similar-movie" />
        </div>
      </div>
      <div className="back-button-container">
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default InfoPage;

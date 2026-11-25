import React from 'react';
import { useParams, Link } from 'react-router-dom';  // Make sure Link is imported
import './WatchPage.css';

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

const WatchPage = () => {
  const { movieName } = useParams(); // Get the movie name from the URL

  // Movie data for all movies with image paths and YouTube links
  const movieDetails = {
    'Shadow and Bone': {
      description: 'A young soldier discovers a power that could unite her country.',
      image: shadowAndBone,
      youtubeLink: 'https://www.youtube.com/watch?v=b1WHQTbJ7vE',
      rating: 'TV-14',
    },
    'The Night Agent': {
      description: 'A thriller about a secret service agent who uncovers a conspiracy.',
      image: nightAgent,
      youtubeLink: 'https://www.youtube.com/watch?v=YDbnY9Obsfs',
      rating: 'TV-MA',
    },
    'Brooklyn Nine-Nine': {
      description: 'A comedic cop series featuring detective Jake Peralta.',
      image: brooklynNine,
      youtubeLink: 'https://www.youtube.com/watch?v=sEOuJ4z5aTc',
      rating: 'TV-14',
    },
    'Ready Player One': {
      description: 'A young man enters a virtual reality game to find a fortune.',
      image: readyPlayerOne,
      youtubeLink: 'https://www.youtube.com/watch?v=cSp1dM2Vj48',
      rating: 'PG-13',
    },
    'Red Notice': {
      description: 'A world-class art thief teams up with an FBI agent to catch a conman.',
      image: redNotice,
      youtubeLink: 'https://www.youtube.com/watch?v=Pj0wz7zu3Ms',
      rating: 'PG-13',
    },
    'Extraction': {
      description: 'A mercenary must rescue a crime lord’s kidnapped son.',
      image: extraction,
      youtubeLink: 'https://www.youtube.com/watch?v=L6P3nI6VnlY',
      rating: 'R',
    },
    'Tiger King': {
      description: 'A docuseries about the world of big cat breeding and its eccentric characters.',
      image: tigerKing,
      youtubeLink: 'https://www.youtube.com/watch?v=acTdxsoa428',
      rating: 'R',
    },
    'Amanda Knox': {
      description: 'A documentary about the Amanda Knox case and the world of crime investigation.',
      image: AmandaKnox,
      youtubeLink: 'https://www.youtube.com/watch?v=mRLt2xBpQbQ',
      rating: 'R',
    },
    'Citizenfour': {
      description: 'A documentary about the whistleblower Edward Snowden and the revelations of mass surveillance.',
      image: Citizenfour,
      youtubeLink: 'https://www.youtube.com/watch?v=rHaWhUjV96M',
      rating: 'R',
    },
    'The Office': {
      description: 'A comedic TV series about the everyday work lives of office employees.',
      image: office,
      youtubeLink: 'https://www.youtube.com/watch?v=MIEVoulYZM0',
      rating: 'TV-14',
    },
    'Family Guy': {
      description: 'An animated comedy series that follows the Griffin family and their crazy adventures.',
      image: familyguy,
      youtubeLink: 'https://www.youtube.com/watch?v=Lz4kS0XOYuI',
      rating: 'TV-14',
    },
    'The Old Guard': {
      description: 'A group of immortal mercenaries are discovered and have to fight to protect their existence.',
      image: Theoldguard,
      youtubeLink: 'https://www.youtube.com/watch?v=lyivgZ074PY',
      rating: 'R',
    },
    'In your Dreams': {
      description: 'A romantic comedy that explores the concept of dreams and reality.',
      image: InyourDreams,
      youtubeLink: 'https://www.youtube.com/watch?v=IG1p9fhNIks',
      rating: 'PG',
    },
    'Avatar 2': {
      description: 'The next chapter in the Avatar universe, continuing the story of Jake and Neytiri.',
      image: Avatar,
      youtubeLink: 'https://www.youtube.com/watch?v=nb_fFj_0rq8',
      rating: 'PG-13',
    },
    'RoofMan': {
      description: 'A movie about a man’s adventures in a big city, set in the roof of skyscrapers.',
      image: Roofman,
      youtubeLink: 'https://www.youtube.com/watch?v=GXecSGmQDEI',
      rating: 'R',
    },
  };

  // Get the movie details based on movie name
  const movie = movieDetails[movieName] || {
    description: 'No description available.',
    image: 'default-image.jpg', // Default image URL
    youtubeLink: 'https://www.youtube.com', // Default link
    rating: 'N/A',
  };

  // Redirect to YouTube when the Play button is clicked
  const handlePlayClick = () => {
    window.location.href = movie.youtubeLink; // Redirect to YouTube
  };

  return (
    <div className="watch-page">
      <div
        className="banner"
        style={{ backgroundImage: `url(${movie.image})` }}
      >
        <div className="overlay"></div> {/* Optional dark overlay */}
        <div className="banner-info">
          <h1>{movieName}</h1>
          <p>{movie.description}</p>
          <div className="banner-actions">
            <button className="btn-play" onClick={handlePlayClick}>Play</button>
            {/* Link to InfoPage using the movie name */}
            <Link to={`/info/${movieName}`} className="btn-info">More Info</Link>
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default WatchPage;

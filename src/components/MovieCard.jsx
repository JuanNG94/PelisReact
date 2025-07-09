import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>

      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
        <p className="movie-date">{movie.release_date}</p>
        <p className="movie-rating">⭐ {movie.vote_average}</p>
        <p className="movie-overview">{movie.overview ? movie.overview.slice(0, 100) + '...' : 'Sin descripción disponible'}</p>
      </div>
    </div>
  );
}

export default MovieCard;

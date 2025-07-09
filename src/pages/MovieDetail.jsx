import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from '../components/BackButton';


import "../styles/MovieDetail.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="detail-container">Cargando...</div>;

  const trailer = movie.videos?.results?.find(video => video.type === "Trailer" && video.site === "YouTube");

  return (
    <div className="detail-container">
      <BackButton />

      <div className="detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="detail-poster"
        />

        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
          <p><strong>Géneros:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
          <p className="overview">{movie.overview}</p>
          <p className="movie-info">
  <strong>Rating:</strong> ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'No disponible'} / 10
</p>

          <div className="cast-grid">
            {movie.credits?.cast?.slice(0, 6).map(actor => (
              <div key={actor.id} className="cast-card">
                <img
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/100x150?text=Sin+Foto'}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <small>{actor.character}</small>
              </div>
            ))}
          </div>

          {trailer && (
            <div className="trailer">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

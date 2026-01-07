import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import usePelisApi from "../hooks/usePelisApi.js";
import BackButton from "../components/BackButton";
import "../styles/Home.css";

function Home() {
  const { movies, info, loading, error, onPrevious, onNext, fetchMovies } =
    usePelisApi("movie/popular", 1);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchInputRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY;

useEffect(() => {
  const urlBase = "https://api.themoviedb.org/3";

  const url =
    search.trim() === ""
      ? `${urlBase}/movie/popular?api_key=${apiKey}&language=es-ES&page=1`
      : `${urlBase}/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(search)}`;

  fetchMovies(url);
  setIsSearching(search.trim() !== "");
  setCurrentPage(1);
}, [search]);


  const handleReset = () => {
    setSearch("");
    setIsSearching(false);
    setCurrentPage(1);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
    fetchMovies(url).then(() => setLoadingUI(false));
    searchInputRef.current?.focus();
  };

  const handleNextPage = () => {
    onNext();
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    onPrevious();
    setCurrentPage((prev) => prev - 1);
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      {(isSearching || currentPage > 1) && <BackButton onClick={handleReset} />}

      <h1 className="title">Pelis React</h1>
      <p className="subtitle">¡Toda la info de tus películas favoritas!</p>

      <div className="search-container">
        {error && !loading && (<p className="error-message">{error}</p>
        )}

        <input
          type="text"
          placeholder="Buscar películas..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
          autoFocus
        />
      </div>
      {!loading && !error && isSearching && movies.length === 0 && (
        <p className="no-results">
          No se encontraron películas para tu búsqueda.
        </p>
      )}

      <div className={`movies-grid ${loading ? 'fade-loading' : 'fade-in'}`}>

        {loading
  ? Array.from({ length: 12 }).map((_, index) => (
      <div key={index} className="skeleton-card"></div>
    ))
  : movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))
}

      </div>

      {!isSearching && !loading && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={info.page === 1}>
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={info.page === info.totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

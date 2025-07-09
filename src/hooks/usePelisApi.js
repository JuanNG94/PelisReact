import { useEffect, useState } from "react";

const useMoviesApi = (initialEndpoint = "movie/popular", initialPage = 1) => {
  const [movies, setMovies] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const buildUrl = (endpoint, page) =>
    `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=es-ES&page=${page}`;

  const fetchMovies = async (endpointOrUrl, page = 1) => {
    setLoading(true);
    setError(null);

    const url = endpointOrUrl.startsWith('http')
      ? endpointOrUrl
      : buildUrl(endpointOrUrl, page);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
      setInfo({
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      });
    } catch (error) {
      console.error("Error al obtener películas:", error);
      setError(error);
      setMovies([]);
      setInfo({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (API_KEY) {
      fetchMovies(initialEndpoint, initialPage);
    } else {
      setError(new Error("API Key no definida en las variables de entorno"));
      setLoading(false);
    }
  }, [initialEndpoint, initialPage, API_KEY]);

  const onPrevious = () => {
    if (info.page > 1) {
      fetchMovies(initialEndpoint, info.page - 1);
    }
  };

  const onNext = () => {
    if (info.page < info.totalPages) {
      fetchMovies(initialEndpoint, info.page + 1);
    }
  };

  return {
    movies,
    info,
    loading,
    error,
    onPrevious,
    onNext,
    fetchMovies,
  };
};

export default useMoviesApi;


// src/App.jsx
import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
// import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const fetchMovies = async () => {
    if (searchTerm.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=c9101667&s=${searchTerm}&type=${type}&y=${year}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year (optional)"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default App;

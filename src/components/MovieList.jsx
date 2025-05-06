import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies.length) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2rem",
        justifyContent: "center",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;

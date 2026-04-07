export default function MovieCard({ movie }) {
  // We extract the data from the 'movie' prop passed down from the parent
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} width="200" />
      <h2>{movie.title}</h2>
      <p>⭐ Rating: {movie.rating}/10</p>
      <p>🏷️ Genre: {movie.genre}</p>
    </div>
  );
}
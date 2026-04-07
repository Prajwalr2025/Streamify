import MovieCard from './movieCard.jsx';

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {/* Loop through the array and render a card for each movie */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
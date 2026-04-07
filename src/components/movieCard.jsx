// src/components/MovieCard.jsx
export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.poster} alt={movie.title} className="poster-image" />
        <span className="type-tag">{movie.type.toUpperCase()}</span>
      </div>
      
      <div className="movie-info">
        {/* Added the Year next to the title */}
        <h3>{movie.title} ({movie.year})</h3>
        
        {/* Added a new paragraph for Rating and Genre */}
        <p className="movie-meta">
          ⭐ {movie.rating} | {movie.genre.split(',')[0]} 
        </p>
      </div>
    </div>
  );
}
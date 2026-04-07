export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        {/* We removed the hardcoded width so CSS can control it */}
        <img src={movie.poster} alt={movie.title} className="poster-image" />
        
        {/* This tag will be positioned over the image */}
        <span className="type-tag">{movie.genre.toUpperCase()}</span>
      </div>
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import our messenger
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("Avengers"); // Default search
  const [movies, setMovies] = useState([]); // Starts as an empty array
  
  // New States for Phase 3
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    setIsLoading(true); // Turn on loading spinner
    setError(null);     // Clear any old errors

    try {
      // Ask the API for data
      const response = await axios.get(`http://www.omdbapi.com/?apikey=293cd81&s=${query}`);

      if (response.data.Response === "True") {
        // The API returns an array called "Search", we map it to match our MovieCard props
        const formattedMovies = response.data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image",
          rating: "N/A", // OMDb search doesn't return ratings, we'll handle this later
          genre: movie.Type
        }));
        setMovies(formattedMovies);
      } else {
        setError(response.data.Error); // e.g., "Movie not found!"
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your internet connection.");
    } finally {
      setIsLoading(false); // Turn off loading spinner no matter what
    }
  };

  // useEffect triggers the fetchMovies function ONCE exactly when the app first loads
  useEffect(() => {
    fetchMovies(searchQuery);
  }, []); // The empty array [] means "only run on mount"

  // This function is triggered when the user clicks the "Search" button
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the browser page from reloading
    fetchMovies(searchQuery);
  };

  return (
    <div className="app-container">
      <Header />
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={handleSearch} 
      />
      
      {/* Conditional Rendering: Only show these if their state is true */}
      {isLoading && <p style={{textAlign: "center", fontSize: "1.5rem"}}>⏳ Fetching movies...</p>}
      {error && <p style={{textAlign: "center", color: "red"}}>❌ {error}</p>}
      
      {/* Only show the list if we are NOT loading and have NO errors */}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}
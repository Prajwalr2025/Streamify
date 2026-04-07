import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("Batman"); 
  const [movies, setMovies] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 1. Create the new state for our dropdown filter
  const [filter, setFilter] = useState(""); 

  const fetchMovies = async (query, typeFilter) => {
    setIsLoading(true); 
    setError(null);     

    try {
      // 2. Dynamically build the URL. If typeFilter exists, add it to the string!
      let apiUrl = `http://www.omdbapi.com/?apikey=293cd81&s=${query}`;
      if (typeFilter !== "") {
        apiUrl += `&type=${typeFilter}`;
      }

      const response = await axios.get(apiUrl);

      if (response.data.Response === "True") {
        const formattedMovies = response.data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image",
          rating: "N/A", 
          genre: movie.Type // This will now say "movie", "series", or "episode"
        }));
        setMovies(formattedMovies);
      } else {
        setError(response.data.Error); 
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your internet connection.");
    } finally {
      setIsLoading(false); 
    }
  };

  // 3. Update useEffect to pass both pieces of state
  useEffect(() => {
    fetchMovies(searchQuery, filter);
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault(); 
    fetchMovies(searchQuery, filter); // Pass both pieces of state when clicking search
  };

  return (
    <div className="app-container">
      <Header />
      {/* 4. Pass the new filter state down to the SearchBar */}
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={handleSearch} 
        filter={filter}
        setFilter={setFilter}
      />
      
      {isLoading && <p style={{textAlign: "center", fontSize: "1.5rem"}}>⏳ Fetching...</p>}
      {error && <p style={{textAlign: "center", color: "red"}}>❌ {error}</p>}
      
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}
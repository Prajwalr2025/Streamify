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
  const [filter, setFilter] = useState(""); 

  const fetchMovies = async (query, typeFilter) => {
    setIsLoading(true); 
    setError(null);     

    try {
      // API KEY LOCATION 1
      let apiUrl = `http://www.omdbapi.com/?apikey=293cd81&s=${query}`;
      if (typeFilter !== "") {
        apiUrl += `&type=${typeFilter}`;
      }

      const response = await axios.get(apiUrl);

      if (response.data.Response === "True") {
        const basicSearchData = response.data.Search;

        const detailedMoviesPromises = basicSearchData.map(async (movie) => {
          // API KEY LOCATION 2
          const detailResponse = await axios.get(`http://www.omdbapi.com/?apikey=293cd81&i=${movie.imdbID}`);
          const details = detailResponse.data;

          return {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image",
            type: movie.Type, 
            year: movie.Year, 
            rating: details.imdbRating !== "N/A" ? details.imdbRating : "N/R", 
            genre: details.Genre !== "N/A" ? details.Genre : "Unknown" 
          };
        });

        const formattedMovies = await Promise.all(detailedMoviesPromises);
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

  useEffect(() => {
    fetchMovies(searchQuery, filter);
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault(); 
    fetchMovies(searchQuery, filter); 
  };

  return (
    <div className="app-container">
      <Header />
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
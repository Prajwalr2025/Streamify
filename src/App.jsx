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
  
  // New States for Client-Side Filtering
  const [minRating, setMinRating] = useState("Any"); 
  const [genreSearch, setGenreSearch] = useState(""); 

  const fetchMovies = async (query) => {
    setIsLoading(true); 
    setError(null);     

    try {
      // 1. Basic Search
      const apiUrl = `http://www.omdbapi.com/?apikey=293cd81&s=${query}`;
      const response = await axios.get(apiUrl);

      if (response.data.Response === "True") {
        const basicSearchData = response.data.Search;

        // 2. Fetch Details (N+1)
        const detailedMoviesPromises = basicSearchData.map(async (movie) => {
          const detailResponse = await axios.get(`http://www.omdbapi.com/?apikey=293cd81&i=${movie.imdbID}`);
          const details = detailResponse.data;

          return {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image",
            type: movie.Type, 
            year: movie.Year, 
            rating: details.imdbRating !== "N/A" ? details.imdbRating : "0", // Fallback to 0
            genre: details.Genre !== "N/A" ? details.Genre : "Unknown" 
          };
        });

        const formattedMovies = await Promise.all(detailedMoviesPromises);

        // 3. THE TRICK: Client-Side Filtering!
        const finalFilteredMovies = formattedMovies.filter((movie) => {
          // Check Rating
          const meetsRating = minRating === "Any" || parseFloat(movie.rating) >= parseFloat(minRating);
          
          // Check Genre (case-insensitive)
          const meetsGenre = genreSearch === "" || movie.genre.toLowerCase().includes(genreSearch.toLowerCase());
          
          return meetsRating && meetsGenre;
        });

        // 4. Update the state with the filtered list
        if (finalFilteredMovies.length === 0) {
           setError("No movies matched your specific filters!");
           setMovies([]);
        } else {
           setMovies(finalFilteredMovies);
        }

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
    fetchMovies(searchQuery);
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault(); 
    fetchMovies(searchQuery); 
  };

  return (
    <div className="app-container">
      <Header />
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        minRating={minRating}
        setMinRating={setMinRating}
        genreSearch={genreSearch}
        setGenreSearch={setGenreSearch}
        handleSearch={handleSearch} 
      />
      
      {isLoading && <p style={{textAlign: "center", fontSize: "1.5rem"}}>⏳ Fetching...</p>}
      {error && <p style={{textAlign: "center", color: "red"}}>❌ {error}</p>}
      
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}
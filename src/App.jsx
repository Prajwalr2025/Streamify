import { useState } from 'react'; // 1. Import the hook
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

export default function App() {
  // 2. Create the state. 
  // 'searchQuery' holds the text. 'setSearchQuery' is the function to change it.
  const [searchQuery, setSearchQuery] = useState(""); 

  const mockMovies = [
    { id: 1, title: "The Matrix", rating: 8.7, genre: "Sci-Fi", poster: "https://via.placeholder.com/200x300?text=The+Matrix" },
    { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action", poster: "https://via.placeholder.com/200x300?text=The+Dark+Knight" },
    { id: 3, title: "Inception", rating: 8.8, genre: "Sci-Fi", poster: "https://via.placeholder.com/200x300?text=Inception" },
    { id: 4, title: "Superbad", rating: 7.6, genre: "Comedy", poster: "https://via.placeholder.com/200x300?text=Superbad" }
  ];

  // 3. Filter the movies based on what is in the state
  // If the title includes the search text (converted to lowercase to avoid case-sensitivity), keep it.
  const filteredMovies = mockMovies.filter((movie) => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header />
      {/* 4. Pass the state and the updater function down to the SearchBar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* 5. Pass the FILTERED movies down to the list, not the whole mock array */}
      <MovieList movies={filteredMovies} />
    </div>
  );
}
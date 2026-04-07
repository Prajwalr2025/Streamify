import Header from './components/header.jsx';
import SearchBar from './components/searchBar.jsx';
import MovieList from './components/movieList.jsx';

export default function App() {
  // PHASE 1 MOCK DATA: We will replace this with real API data in Phase 3
  const mockMovies = [
    {
      id: 1,
      title: "The Matrix",
      rating: 8.7,
      genre: "Sci-Fi",
      poster: "https://via.placeholder.com/200x300?text=The+Matrix"
    },
    {
      id: 2,
      title: "The Dark Knight",
      rating: 9.0,
      genre: "Action",
      poster: "https://via.placeholder.com/200x300?text=The+Dark+Knight"
    }
  ];

  return (
    <div className="app-container">
      <Header />
      <SearchBar />
      {/* We pass the mock data array to the list component as a prop */}
      <MovieList movies={mockMovies} />
    </div>
  );
}
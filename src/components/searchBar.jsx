export default function SearchBar({ searchQuery, setSearchQuery, minRating, setMinRating, genreSearch, setGenreSearch, handleSearch }) {
  return (
    <form className="search-container" onSubmit={handleSearch}>
      {/* Title Input */}
      <input 
        type="text" 
        placeholder="Search for a title..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      
      {/* Min Rating Dropdown */}
      <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
        <option value="Any">Any Rating</option>
        <option value="5">5.0+</option>
        <option value="6">6.0+</option>
        <option value="7">7.0+</option>
        <option value="8">8.0+</option>
        <option value="9">9.0+</option>
      </select>

      {/* Genre Text Input */}
      <input 
        type="text" 
        placeholder="e.g. Sci-Fi" 
        value={genreSearch}
        onChange={(e) => setGenreSearch(e.target.value)} 
      />

      <button type="submit">Search</button>
    </form>
  );
}
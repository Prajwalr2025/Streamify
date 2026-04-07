// We added 'filter' and 'setFilter' as new props
export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, filter, setFilter }) {
  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Search for a title..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button type="submit">Search</button>
      
      {/* Tie the select dropdown to our new filter state */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="episode">Episodes</option>
      </select>
    </form>
  );
}
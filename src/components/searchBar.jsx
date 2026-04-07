// We added 'handleSearch' as a new prop
export default function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    // We changed the <div> to a <form> and added the onSubmit event
    <form className="search-container" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button type="submit">Search</button>
      
      <select>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
      </select>
    </form>
  );
}
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={searchQuery} // The input displays whatever the state is
        onChange={(e) => setSearchQuery(e.target.value)} // When you type, update the state!
      />
      <select>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
      </select>
    </div>
  );
}
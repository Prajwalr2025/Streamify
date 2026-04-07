export default function SearchBar() {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search for a movie..." 
      />
      <select>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
      </select>
    </div>
  );
}
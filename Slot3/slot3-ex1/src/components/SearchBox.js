const SearchBox = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <div className="row mb-4">
      <div className="col-9">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-3">
        <button
          onClick={onSearch}
          className="btn btn-primary w-100"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
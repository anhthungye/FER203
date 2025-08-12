const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className="mb-4">
      <label className="form-label">Sort by:</label>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="form-select"
      >
        <option value="">No sorting</option>
        <option value="year-asc">Year ascending</option>
        <option value="year-desc">Year descending</option>
        <option value="duration">Operating period</option>
      </select>
    </div>
  );
};

export default SortDropdown;
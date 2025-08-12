const CategoryFilter = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <div className="mb-4">
      <label className="form-label">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="form-select"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
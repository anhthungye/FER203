const FilteredResult = ({ filteredByAgeSkill }) => (
  <div className="card mb-4 shadow border-warning">
    <div className="card-body">
      <h5 className="card-title mb-3 text-warning">
        <i className="bi bi-search me-2"></i>Filtered Results by Age and Skill
      </h5>
      {filteredByAgeSkill.length === 0 ? (
        <div className="text-center text-muted py-3">No results found</div>
      ) : (
        <ul className="list-group">
          {filteredByAgeSkill.map(({ id, firstName, lastName, skills, isActive }) => (
            <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {firstName} {lastName} - {skills.map(skill => (
                  <span key={skill} className="badge bg-info text-dark me-1">{skill}</span>
                ))}
              </span>
              <span className={isActive ? "badge bg-success" : "badge bg-secondary"}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default FilteredResult;
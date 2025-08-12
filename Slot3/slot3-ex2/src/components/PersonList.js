const PersonList = ({ searchTerm, onSearchTermChange, sortOrder, onToggleSort, persons }) => (
  <div className="card mb-4 shadow-lg border-primary">
    <div className="card-body">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
        <h2 className="h4 mb-3 mb-md-0 text-primary d-flex align-items-center">
          <i className="bi bi-people-fill me-2"></i>Person List
        </h2>
        <div className="input-group" style={{ maxWidth: 320 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by full name..."
            value={searchTerm}
            onChange={e => onSearchTermChange(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={onToggleSort}>
            <i className={`bi bi-sort-alpha-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>
            Sort: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
          </button>
        </div>
      </div>
      <ul className="list-group">
        {persons.map(({ id, firstName, lastName, age, city, skills, isActive }) => (
          <li key={id} className="list-group-item list-group-item-action border rounded mb-2 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div>
              <div className="fw-semibold">{firstName} {lastName}</div>
              <div className="text-muted small">Age: {age} | City: {city}</div>
              <div className="text-primary small">
                Skills: {skills.map(skill => (
                  <span key={skill} className="badge bg-info text-dark me-1">{skill}</span>
                ))}
                <span className={isActive ? "badge bg-success ms-2" : "badge bg-secondary ms-2"}>
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <span className={`ms-md-3 badge rounded-pill ${isActive ? 'bg-success' : 'bg-secondary'}`}>
              <i className={`bi ${isActive ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PersonList;
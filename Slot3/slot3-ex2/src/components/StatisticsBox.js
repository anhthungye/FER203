const StatisticsBox = ({ totalPeople, averageAge, activeCount }) => (
  <div className="card mb-4 shadow border-success">
    <div className="card-body">
      <h5 className="card-title mb-3 text-success">
        <i className="bi bi-bar-chart-fill me-2"></i>Statistics
      </h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span><i className="bi bi-people me-1"></i>Total people:</span>
          <span className="fw-bold text-primary">{totalPeople}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span><i className="bi bi-person-badge me-1"></i>Average age:</span>
          <span className="fw-bold text-primary">{averageAge}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span><i className="bi bi-check-circle me-1"></i>Active people:</span>
          <span className="fw-bold text-success">{activeCount}</span>
        </li>
      </ul>
    </div>
  </div>
);

export default StatisticsBox;
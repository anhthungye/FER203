const StatisticsBox = ({ totalPeople, averageAge, activeCount }) => {
  const stats = [
    {
      icon: "bi-people",
      label: "Total people:",
      value: totalPeople,
      valueClass: "text-primary"
    },
    {
      icon: "bi-person-badge",
      label: "Average age:",
      value: averageAge,
      valueClass: "text-primary"
    },
    {
      icon: "bi-check-circle",
      label: "Active people:",
      value: activeCount,
      valueClass: "text-success"
    }
  ];

  return (
    <div className="card mb-4 shadow border-success">
      <div className="card-body">
        <h5 className="card-title mb-3 text-success">
          <i className="bi bi-bar-chart-fill me-2"></i>Statistics
        </h5>
        <ul className="list-group list-group-flush">
          {stats.map(({ icon, label, value, valueClass }, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <span><i className={`bi ${icon} me-1`}></i>{label}</span>
              <span className={`fw-bold ${valueClass}`}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatisticsBox;
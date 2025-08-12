const CompanyTable = ({ companies }) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-4 text-secondary">
        <p>No result</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Start Year</th>
            <th>End Year</th>
            <th>Operating period</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.category}</td>
              <td>{company.start}</td>
              <td>{company.end}</td>
              <td>{company.end - company.start} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
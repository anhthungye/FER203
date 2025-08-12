const SkillRanking = ({ persons }) => {
  const skillCounts = persons.reduce((acc, person) => {
    person.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});
  const sortedSkills = Object.entries(skillCounts).sort(([, a], [, b]) => b - a);
  const topSkill = sortedSkills[0]?.[0];

  return (
    <div className="card shadow border-danger">
      <div className="card-body">
        <h5 className="card-title mb-3 text-danger">
          <i className="bi bi-trophy-fill me-2"></i>Skill Ranking
        </h5>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-danger">
              <tr>
                <th>Skill</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {sortedSkills.map(([skill, count]) => (
                <tr key={skill} className={skill === topSkill ? 'table-warning fw-bold' : ''}>
                  <td>
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    {skill}
                  </td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillRanking;
const AgeSkillFilter = ({ minAge, maxAge, selectedSkill, onMinAgeChange, onMaxAgeChange, onSkillChange, allSkills }) => (
  <div className="card mb-4 shadow border-info">
    <div className="card-body">
      <h5 className="card-title mb-3 text-info">
        <i className="bi bi-funnel-fill me-2"></i>Filter by Age and Skill
      </h5>
      <div className="row g-2">
        <div className="col-12 col-md-4">
          <input
            type="number"
            className="form-control border-info"
            placeholder="Min age"
            value={minAge}
            onChange={e => onMinAgeChange(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <input
            type="number"
            className="form-control border-info"
            placeholder="Max age"
            value={maxAge}
            onChange={e => onMaxAgeChange(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select border-info"
            value={selectedSkill}
            onChange={e => onSkillChange(e.target.value)}
          >
            <option value="">All skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default AgeSkillFilter;
import React from "react";
import { Form } from "react-bootstrap";

function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="text-end my-2">
      <Form.Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ maxWidth: "250px" }}
      >
        <option value="">Sort by</option>
        <option value="age-asc">Age ↑</option>
        <option value="age-desc">Age ↓</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
      </Form.Select>
    </div>
  );
}

export default SortDropdown;

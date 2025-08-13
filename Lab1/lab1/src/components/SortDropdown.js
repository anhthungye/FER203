import React from "react";
import { Form } from "react-bootstrap";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A→Z" },
  { value: "name-desc", label: "Name Z→A" },
  { value: "prep-asc", label: "Prep ↑" },
  { value: "prep-desc", label: "Prep ↓" },
  { value: "cook-asc", label: "Cook ↑" },
  { value: "cook-desc", label: "Cook ↓" },
];

const SortDropdown = ({ sortBy, setSortBy }) => (
  <Form.Select
    value={sortBy}
    onChange={e => setSortBy(e.target.value)}
    style={{ maxWidth: 200, display: "inline-block" }}
    className="mb-3 ms-md-3 custom-sort custom-filter-select"
  >
    {SORT_OPTIONS.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </Form.Select>
);

export default SortDropdown;
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { Search } from "lucide-react";

const timeOptionsPrep = ["Max Prep Time", 5, 10, 12, 15, 20, 30];
const timeOptionsCook = ["Max Cook Time", 5, 10, 12, 15, 20, 30];

const Filters = ({ onChange }) => {
  const [maxPrep, setMaxPrep] = useState("Max Prep Time");
  const [maxCook, setMaxCook] = useState("Max Cook Time");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    onChange({
      maxPrep: maxPrep === "Max Prep Time" ? Infinity : Number(maxPrep),
      maxCook: maxCook === "Max Cook Time" ? Infinity : Number(maxCook),
      query: debouncedQuery.trim().toLowerCase(),
    });
  }, [maxPrep, maxCook, debouncedQuery, onChange]);

  return (
    <Container className="my-4 custom-filter">
      <Row className="g-3 align-items-center">
        <Col xs={12} md={3}>
          <Form.Select
            value={maxPrep}
            onChange={(e) => setMaxPrep(e.target.value)}
            className="border-secondary custom-filter-select"
          >
            {timeOptionsPrep.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            value={maxCook}
            onChange={(e) => setMaxCook(e.target.value)}
            className="border-secondary custom-filter-select"
          >
            {timeOptionsCook.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={6}>
          <div className="position-relative" style={{ maxWidth: 320, marginLeft: "auto" }}>
            <Search
              size={16}
              className="position-absolute text-muted custom-filter-icon"
              style={{
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              color="#1a311f"
            />
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ps-5 border-secondary custom-filter-input"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Filters;
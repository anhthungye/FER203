import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Send } from "lucide-react";

const RecipeRequestForm = ({ show, onClose }) => {
  const [validated, setValidated] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    ingredient: "",
    notes: "",
    prep: "5"
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    // Nếu muốn xử lý gửi form, kiểm tra hợp lệ ở đây
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{zIndex: 1050}}>
      <Form className="bg-white p-4 rounded shadow" style={{minWidth: 350, maxWidth: 400}} noValidate onSubmit={handleSubmit}>
        <h5 className="mb-3">Recipe Request Form</h5>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            isInvalid={validated && !fields.name}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            isInvalid={validated && !fields.email}
            required
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Desired Ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Salmon, Avocado, ..."
            name="ingredient"
            value={fields.ingredient}
            onChange={handleChange}
            isInvalid={validated && !fields.ingredient}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter an ingredient</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max Prep Time</Form.Label>
          <Form.Select
            name="prep"
            value={fields.prep}
            onChange={handleChange}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>30</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Any additional notes..."
            name="notes"
            value={fields.notes}
            onChange={handleChange}
            isInvalid={validated && !fields.notes}
          />
          <Form.Control.Feedback type="invalid">Please enter your notes</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            <Send size={16} className="me-1" /> Submit Request
          </Button>
          <Button variant="outline-secondary" onClick={onClose}>Close</Button>
        </div>
      </Form>
    </div>
  );
};

export default RecipeRequestForm;
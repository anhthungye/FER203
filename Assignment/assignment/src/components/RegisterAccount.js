import React from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'lucide-react';

const RegisterAccount = ({ formData, handleChange, prevStep, onSubmit }) => {
  const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "What is your favorite book?"
  ];

  const passwordChecks = [
    { label: 'At least 8 characters', valid: formData.password.length >= 8 },
    { label: 'At least 1 uppercase letter', valid: /[A-Z]/.test(formData.password) },
    { label: 'At least 1 lowercase letter', valid: /[a-z]/.test(formData.password) },
    { label: 'At least 1 number', valid: /\d/.test(formData.password) },
    { label: 'At least 1 special character (!@#$%^&*)', valid: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allPasswordValid = passwordChecks.every(c => c.valid);

  const canSubmit =
    formData.username &&
    allPasswordValid &&
    formData.password === formData.confirmPassword &&
    formData.secretQuestion &&
    formData.answer;

  return (
    <div>
      <h4 className="mb-4">Account Details</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
            placeholder="Choose a username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
            placeholder="Create a strong password"
          />

          {/* Hiển thị rule kiểm tra */}
          <ListGroup variant="flush" className="mt-2">
            {passwordChecks.map((rule, i) => (
              <ListGroup.Item
                key={i}
                className={rule.valid ? "text-success small" : "text-danger small"}
              >
                {rule.valid ? (
                  <CheckCircle size={14} className="me-2" />
                ) : (
                  <XCircle size={14} className="me-2" />
                )}
                {rule.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            required
            isInvalid={
              formData.confirmPassword && formData.password !== formData.confirmPassword
            }
            placeholder="Confirm your password"
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Secret Question *</Form.Label>
          <Form.Select
            value={formData.secretQuestion}
            onChange={(e) => handleChange('secretQuestion', e.target.value)}
            required
          >
            <option value="">Select a security question</option>
            {secretQuestions.map((q, idx) => (
              <option key={idx} value={q}>{q}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Answer *</Form.Label>
          <Form.Control
            type="text"
            value={formData.answer}
            onChange={(e) => handleChange('answer', e.target.value)}
            required
            placeholder="Enter your answer"
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={prevStep}>
            Previous
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={!canSubmit}>
            Complete Registration
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterAccount;

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AccountTab({ data, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "Who was your favorite teacher?"
  ];

  const passwordChecks = {
    length: data.password.length >= 8,
    uppercase: /[A-Z]/.test(data.password),
    number: /[0-9]/.test(data.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(data.password),
  };

  const allPasswordValid = Object.values(passwordChecks).every(Boolean);

  const isUsernameValid = data.username.length >= 6;
  const isConfirmPasswordValid = data.password === data.confirmPassword;
  const isSecretAnswerValid = data.secretAnswer.trim() !== '';

  return (
    <Form>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username (min 6 characters)"
          value={data.username}
          onChange={(e) => onChange('account', 'username', e.target.value)}
          isInvalid={data.username && !isUsernameValid}
          required
          minLength={6}
        />
        <Form.Control.Feedback type="invalid">
          Username must be at least 6 characters
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="input-group">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => onChange('account', 'password', e.target.value)}
            isInvalid={data.password && !allPasswordValid}
            required
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mt-2">
          <div className={`password-check ${passwordChecks.length ? 'valid' : ''}`}>
            {passwordChecks.length ? '✓' : '•'} At least 8 characters
          </div>
          <div className={`password-check ${passwordChecks.uppercase ? 'valid' : ''}`}>
            {passwordChecks.uppercase ? '✓' : '•'} 1 uppercase letter
          </div>
          <div className={`password-check ${passwordChecks.number ? 'valid' : ''}`}>
            {passwordChecks.number ? '✓' : '•'} 1 number
          </div>
          <div className={`password-check ${passwordChecks.specialChar ? 'valid' : ''}`}>
            {passwordChecks.specialChar ? '✓' : '•'} 1 special character
          </div>
        </div>
      </Form.Group>

      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <div className="input-group">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={data.confirmPassword}
            onChange={(e) => onChange('account', 'confirmPassword', e.target.value)}
            isInvalid={data.confirmPassword && !isConfirmPasswordValid}
            required
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Form.Control.Feedback type="invalid">
          Passwords do not match
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="secretQuestion" className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={data.secretQuestion}
          onChange={(e) => onChange('account', 'secretQuestion', e.target.value)}
          isInvalid={!data.secretQuestion}
          required
        >
          <option value="">Select a secret question</option>
          {secretQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a secret question
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="secretAnswer" className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your answer"
          value={data.secretAnswer}
          onChange={(e) => onChange('account', 'secretAnswer', e.target.value)}
          isInvalid={data.secretAnswer && !isSecretAnswerValid}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter an answer
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AccountTab.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AccountTab;
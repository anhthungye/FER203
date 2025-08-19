import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AboutTab({ data, onChange, onFileChange }) {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const isPhoneValid = /^\+?\d{10,15}$/.test(data.phone);

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={data.firstName}
              onChange={(e) => onChange('about', 'firstName', e.target.value)}
              isInvalid={!data.firstName}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={data.lastName}
              onChange={(e) => onChange('about', 'lastName', e.target.value)}
              isInvalid={!data.lastName}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter your age"
                value={data.age}
                onChange={(e) => onChange('about', 'age', e.target.value)}
                isInvalid={!!data.age && (data.age < 18 || data.age > 100)}
                required
            />
            <Form.Control.Feedback type="invalid">
                Age must be between 18 and 100
            </Form.Control.Feedback>
            </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={data.email}
          onChange={(e) => onChange('about', 'email', e.target.value)}
          isInvalid={data.email && !isEmailValid}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone" className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          value={data.phone}
          onChange={(e) => onChange('about', 'phone', e.target.value)}
          isInvalid={data.phone && !isPhoneValid}
          required
        />
        <Form.Control.Feedback type="invalid">
          Phone must be 10-15 digits
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="avatar" className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
            type="file"
            accept="image/*"
            onChange={onFileChange}
            isInvalid={!data.avatar}  
            required
        />
        {!data.avatar && (
            <Form.Control.Feedback type="invalid">
            Please upload an avatar
            </Form.Control.Feedback>
        )}
        {data.avatarPreview && (
            <div className="mt-2">
            <img 
                src={data.avatarPreview} 
                alt="Avatar preview" 
                style={{ maxWidth: '100px', maxHeight: '100px' }} 
            />
            </div>
        )}
        </Form.Group>
    </Form>
  );
}

AboutTab.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired
};

export default AboutTab;
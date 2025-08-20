import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AboutTab({ data, onChange, onFileChange, onNext }) {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  return (
    <Form>
      <Row className="align-items-center">
        <Col md={4} className="text-center">
          <div className="mb-3">
            {data.avatarPreview ? (
              <img
                src={data.avatarPreview}
                alt="Avatar preview"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center border rounded-circle bg-light"
                style={{ width: '150px', height: '150px', margin: '0 auto' }}
              >
                <span className="text-muted">No Avatar</span>
              </div>
            )}
          </div>
          <Form.Group controlId="avatar" className="mb-3">
            <Form.Label className="fw-bold">Choose Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </Form.Group>
        </Col>

        <Col md={8}>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => onChange('about', 'firstName', e.target.value)}
              isInvalid={!data.firstName}
              required
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              onChange={(e) => onChange('about', 'lastName', e.target.value)}
              isInvalid={!data.lastName}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => onChange('about', 'email', e.target.value)}
              isInvalid={data.email && !isEmailValid}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

AboutTab.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutTab;

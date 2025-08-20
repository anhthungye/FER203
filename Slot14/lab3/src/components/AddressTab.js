import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const countries = ['Viet Nam', 'Korea', 'Italy', 'United States', 'Japan', 'France', 'Germany'];

function AddressTab({ data, onChange }) {
  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="streetName">
            <Form.Label>Street Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street name"
              value={data.streetName}
              onChange={(e) => onChange('address', 'streetName', e.target.value)}
              isInvalid={!data.streetName}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter street name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="streetNumber">
            <Form.Label>Street Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street number"
              value={data.streetNumber}
              onChange={(e) => onChange('address', 'streetNumber', e.target.value)}
              isInvalid={!data.streetNumber}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter street number
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={data.city}
              onChange={(e) => onChange('address', 'city', e.target.value)}
              isInvalid={!data.city}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter city
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Select
              value={data.country}
              onChange={(e) => onChange('address', 'country', e.target.value)}
              isInvalid={!data.country}
              required
            >
              <option value="">Select country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select country
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

AddressTab.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AddressTab;

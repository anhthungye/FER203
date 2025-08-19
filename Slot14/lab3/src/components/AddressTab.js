import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const countries = ['Viet Nam', 'Korea', 'Italy', 'United States', 'Japan', 'France', 'Germany'];

function AddressTab({ data, onChange }) {
  return (
    <Form>
      <Form.Group controlId="street" className="mb-3">
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter street address"
          value={data.street}
          onChange={(e) => onChange('address', 'street', e.target.value)}
          isInvalid={!data.street}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter street address
        </Form.Control.Feedback>
      </Form.Group>

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
          <Form.Group controlId="province">
            <Form.Label>State/Province</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state or province"
              value={data.province}
              onChange={(e) => onChange('address', 'province', e.target.value)}
              isInvalid={!data.province}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter state/province
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="zipCode">
            <Form.Label>Zip/Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip or postal code"
              value={data.zipCode}
              onChange={(e) => onChange('address', 'zipCode', e.target.value)}
              isInvalid={!data.zipCode}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter zip/postal code
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
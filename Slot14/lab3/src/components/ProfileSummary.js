import React from 'react';
import { Modal, Card, Image, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProfileSummary({ show, onHide, data }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4">Profile Summary</Card.Title>
            
            <div className="text-center mb-4">
              {data.about.avatarPreview ? (
                <Image 
                  src={data.about.avatarPreview} 
                  roundedCircle 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center bg-light rounded-circle" 
                  style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                  No Avatar
                </div>
              )}
            </div>

            <Card.Subtitle className="mb-2">About</Card.Subtitle>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <strong>Name:</strong> {data.about.firstName} {data.about.lastName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {data.about.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone:</strong> {data.about.phone}
              </ListGroup.Item>
            </ListGroup>

            <Card.Subtitle className="mb-2">Account</Card.Subtitle>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <strong>Username:</strong> {data.account.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Secret Question:</strong> {data.account.secretQuestion}
              </ListGroup.Item>
            </ListGroup>

            <Card.Subtitle className="mb-2">Address</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Street:</strong> {data.address.street}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>City:</strong> {data.address.city}, {data.address.state}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Postal Code:</strong> {data.address.zipCode}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Country:</strong> {data.address.country}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ProfileSummary.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default ProfileSummary;
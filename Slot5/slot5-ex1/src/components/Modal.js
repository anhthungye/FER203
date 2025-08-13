import React from "react";
import { Modal as RBModal, Button, Row, Col } from "react-bootstrap";
import { Users, Clock, ChefHat } from "lucide-react";

const Modal = ({ show, onClose, recipe }) => {
  if (!show || !recipe) return null;

  return (
    <RBModal show={show} onHide={onClose} size="lg" centered>
      <RBModal.Header closeButton>
        <RBModal.Title>{recipe.title}</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="img-fluid rounded mb-3 w-100"
          style={{height: '300px', objectFit: 'cover'}}
        />
        <p className="mb-3">{recipe.description}</p>
        <Row className="g-3">
          <Col xs={4}>
            <div className="text-center p-3 bg-light rounded">
              <Users className="mb-2 text-success" />
              <div className="fw-bold">{recipe.servings}</div>
              <small className="text-muted">Servings</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="text-center p-3 bg-light rounded">
              <Clock className="mb-2 text-info" />
              <div className="fw-bold">{recipe.prep}m</div>
              <small className="text-muted">Prep Time</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="text-center p-3 bg-light rounded">
              <ChefHat className="mb-2 text-warning" />
              <div className="fw-bold">{recipe.cook}m</div>
              <small className="text-muted">Cook Time</small>
            </div>
          </Col>
        </Row>
      </RBModal.Body>
      <RBModal.Footer>
         <Button variant="success" onClick={() => alert("Add successful!")}>
          Add to Card
        </Button>
        <Button variant="outline-secondary" onClick={onClose}>
          Close
        </Button>
      </RBModal.Footer>
    </RBModal>
  );
};

export default Modal;
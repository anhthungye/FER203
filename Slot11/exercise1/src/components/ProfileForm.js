import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Toast, Modal, Card, InputGroup } from "react-bootstrap";
import { User, Mail, Hash, CheckCircle } from "lucide-react";

function ProfileForm({ initialName, initialEmail, initialAge }) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [age, setAge] = useState(initialAge);

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isValidName = name.trim() !== "";
  const isValidEmail = email.includes("@");
  const isValidAge = Number(age) >= 1;
  const isFormValid = isValidName && isValidEmail && isValidAge;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  return (
    <>
      <Card className="shadow p-4 rounded-3 border-0">
        <Card.Body>
          <Card.Title className="text-center mb-4">Profile Form</Card.Title>
          <Form onSubmit={handleSubmit}>
    
            <Form.Group className="mb-3">
              <Form.Label>
                <User size={18} className="me-2 text-primary" />
                Name
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!isValidName && name !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  Name cannot be empty.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

        
            <Form.Group className="mb-3">
              <Form.Label>
                <Mail size={18} className="me-2 text-primary" />
                Email
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!isValidEmail && email !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  Email must contain @
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>
                <Hash size={18} className="me-2 text-primary" />
                Age
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  isInvalid={!isValidAge && age !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  Age must be at least 1.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

        
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid}
                className="px-4 d-flex align-items-center mx-auto"
              >
                <CheckCircle className="me-2" size={18} />
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="light"
        className="position-fixed bottom-0 end-0 m-3 shadow rounded-3 border"
        >
        <Toast.Header closeButton={false}>
            <CheckCircle className="text-success me-2" size={18} />
            <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-dark">
            Submitted successfully!
        </Toast.Body>
        </Toast>


      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold">{name}</Card.Title>
              <Card.Text>
                <Mail size={16} className="me-2 text-secondary" />
                {email}
              </Card.Text>
              <Card.Text>
                <Hash size={16} className="me-2 text-secondary" />
                {age}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  initialName: PropTypes.string,
  initialEmail: PropTypes.string,
  initialAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProfileForm.defaultProps = {
  initialName: "",
  initialEmail: "",
  initialAge: "",
};

export default ProfileForm;

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [submittedMessage, setSubmittedMessage] = useState(""); 

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);

    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  useEffect(() => {
    if (submittedMessage) {
      const timer = setTimeout(() => {
        setSubmittedMessage("");
      }, 3000); // 3 giây
      return () => clearTimeout(timer);
    }
  }, [submittedMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(`Bạn đã nhập: "${value}"`);
    setValue("");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <h3 className="text-center mb-4 text-primary fw-bold">
            Form Validation
          </h3>

          {submittedMessage && (
            <Alert variant="success" className="text-center fw-semibold">
              {submittedMessage}
            </Alert>
          )}

          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded bg-white shadow-sm"
          >
            <Form.Group controlId="validatedInput" className="mb-3">
              <Form.Label className="fw-semibold">Nhập một giá trị</Form.Label>
              <Form.Control
                type="text"
                value={value}
                placeholder="Nhập ít nhất 5 ký tự..."
                onChange={(e) => setValue(e.target.value)}
                isValid={isValid && value !== ""}
                isInvalid={!isValid && value !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                Giá trị hợp lệ 
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid}
                size="lg"
              >
                Gửi
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ValidatedInput;

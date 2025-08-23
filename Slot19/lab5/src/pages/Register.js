import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);
  
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!validateEmail(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (!validatePassword(formData.password)) {
      showToast('Password must be at least 8 characters with uppercase, lowercase, number and special character', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email
    };
    
    login(userData);
    showToast('Registration successful! Welcome!', 'success');
    navigate('/');
  };

  return (
    <Container className="register-container">
      <h1 className="register-title">Register Account</h1>
      
      <Card className="register-card">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="register-form">
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="register-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="register-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                placeholder="Enter your password (min. 8 characters)"
                className="register-input"
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters with uppercase, lowercase, number and special character.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="register-input"
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" className="register-button">
                Register
              </Button>
            </div>

            <div className="register-login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
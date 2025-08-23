import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);
  
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

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

    // Simulate login
    const userData = {
      id: Date.now(),
      name: formData.email.split('@')[0], 
      email: formData.email
    };
    
    login(userData);
    showToast('Login successful! Welcome back!', 'success');
    navigate(-1);
  };

  return (
    <Container className="login-container">
      <h1 className="login-title">Login</h1>
      
      <Card className="login-card">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="login-input"
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
                placeholder="Enter your password"
                className="login-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your password.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" className="login-button">
                Login
              </Button>
            </div>

            <div className="login-register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
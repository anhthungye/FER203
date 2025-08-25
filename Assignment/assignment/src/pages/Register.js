import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import RegisterWizard from '../components/RegisterWizard';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    // About step
    fullName: '',
    email: '',
    avatar: null,
    avatarPreview: '',
    
    // Account step
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: ''
  });

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await register(formData);
      addToast('Registration successful. You are now signed in.', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.message || 'Registration failed. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="ecommerce-auth-card">
            <Card.Body>
              <div className="text-center mb-4">
                <UserPlus size={40} className="text-primary mb-2" />
                <h2>Create Your Account</h2>
                <p className="text-muted">
                  Join us to start shopping with exclusive benefits
                </p>
              </div>

              <RegisterWizard 
                formData={formData}
                handleChange={handleChange}
                onSubmit={handleSubmit}
              />

              <div className="text-center mt-3">
                <Button 
                  variant="secondary" 
                  onClick={handleCancel}
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>  
  );
};

export default Register;

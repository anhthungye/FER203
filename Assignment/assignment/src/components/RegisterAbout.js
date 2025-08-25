import React, { useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Upload } from 'lucide-react';

const RegisterAbout = ({ formData, handleChange, nextStep }) => {
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Please select a JPG or PNG image');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange('avatar', file);
      handleChange('avatarPreview', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const canProceed = formData.fullName && /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div>
      <h4 className="mb-4">About You</h4>

      <Row>
        {/* Avatar bên trái */}
        <Col md={4} className="text-center mb-3">
          <div
            className="border rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{ width: '150px', height: '150px', cursor: 'pointer', overflow: 'hidden' }}
            onClick={handleAvatarClick}
          >
            {formData.avatarPreview ? (
              <img
                src={formData.avatarPreview}
                alt="Avatar preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-center">
                <Upload size={32} className="text-muted mb-1" />
                <span className="d-block text-muted small">Upload</span>
              </div>
            )}
          </div>
          <p className="small text-muted mb-0">Max 2MB</p>
          <p className="small text-muted">JPG or PNG only</p>
          <Form.Control
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/jpeg,image/png"
            style={{ display: 'none' }}
          />
        </Col>

        {/* Full Name + Email bên phải */}
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              placeholder="Enter your email address"
              isInvalid={formData.email && !/\S+@\S+\.\S+/.test(formData.email)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={nextStep} disabled={!canProceed}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegisterAbout;

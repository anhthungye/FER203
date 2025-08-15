import { useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';

function MovieRequestForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.year || formData.year < 1900) newErrors.year = 'Year must be after 1900';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be positive';
    if (!formData.description || formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'duration' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: '',
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="mb-4">Movie Request Form</h2>
      
      {submitted && (
        <Alert variant="success" className="mb-4">
          Request submitted. Thank you!
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            isInvalid={!!errors.genre}
          >
            <option value="">Select a genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.genre}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                isInvalid={!!errors.year}
              />
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                isInvalid={!!errors.duration}
              />
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {formData.description.length}/30 characters minimum
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit" className="w-100">
          <Send className="me-2" size={18} />
          Submit Request
        </Button>
      </Form>
    </div>
  );
}

MovieRequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MovieRequestForm;
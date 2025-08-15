import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import PropTypes from "prop-types";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự";
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống";
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10 đến 15 chữ số";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản";
    }

    setErrors(newErrors);
    setShowErrorAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setShowErrorAlert(false);
      setShowSuccessAlert(true);

      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        gender: "",
        agree: false,
      });

      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h4 className="text-center mb-4 text-primary">Đăng ký thông tin</h4>

              {showErrorAlert && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setShowErrorAlert(false)}
                >
                  <strong>Lỗi:</strong> Vui lòng kiểm tra các trường hợp lỗi.
                </Alert>
              )}

              {showSuccessAlert && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setShowSuccessAlert(false)}
                >
                  Gửi thành công!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label>Tuổi</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    isInvalid={!!errors.gender}
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAgree">
                  <Form.Check
                    type="checkbox"
                    label="Đồng ý với điều khoản"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    isInvalid={!!errors.agree}
                    feedback={errors.agree}    
                    feedbackType="invalid"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.agree}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" size="lg" type="submit">
                    Gửi
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
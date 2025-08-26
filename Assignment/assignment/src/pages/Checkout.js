import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useOrders } from '../context/OrderContext';
import { CreditCard, Lock } from 'lucide-react';

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const { user } = useAuth();
  const { items, getCartSubtotal, clearCart } = useCart();
  const { addToast } = useToast();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login?redirect_uri=/checkout');
  }, [user, navigate]);

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  if (!user || items.length === 0) return null;

  // xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!shippingInfo.firstName.trim()) newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required";
    } else if (!/^\d{4,6}$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = "Zip Code must be 4-6 digits";
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{9,11}$/.test(shippingInfo.phone)) {
      newErrors.phone = "Phone must be 9-11 digits";
    }
    return newErrors;
  };

  // xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      addToast('Please fix the errors in the form', 'error');
      return;
    }

    try {
      const order = {
        id: Date.now(),
        userId: user.id,
        items,
        total: getCartSubtotal(),
        date: new Date().toISOString(),
        shippingInfo,
        paymentMethod,
      };
      await createOrder(order);
      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate('/');
    } catch (err) {
      addToast('Failed to place order. Please try again.', 'error');
    }
  };

  return (
    <div className="ecommerce-checkout-page">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Card className="mb-4 ecommerce-checkout-card">
              <Card.Header><h5>Shipping Information</h5></Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        isInvalid={!!errors.zipCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zipCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header><h5>Payment Method</h5></Card.Header>
              <Card.Body>
                <Form.Check
                  type="radio"
                  id="credit-card"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                  label="Credit Card"
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  label="PayPal"
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  label="Cash on Delivery"
                />
              </Card.Body>
            </Card>

            <Button type="submit" variant="primary" size="lg" className="w-100 d-flex align-items-center justify-content-center">
              <Lock size={20} className="me-2" />
              Place Order
            </Button>
          </Form>
        </Col>
        
        {/* Order Summary giữ nguyên */}
        <Col lg={4}>
          <Card>
            <Card.Header><h5>Order Summary</h5></Card.Header>
            <Card.Body>
              {items.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">{item.title}</h6>
                    <small className="text-muted">Qty: {item.qty}</small>
                  </div>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total</span>
                <span>${getCartSubtotal().toFixed(2)}</span>
              </div>
              <Alert variant="info" className="small">
                <CreditCard size={16} className="me-2" />
                Your personal data will be used to process your order.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;

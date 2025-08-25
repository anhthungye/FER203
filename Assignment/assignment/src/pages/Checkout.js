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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
              <Card.Header>
                <h5>Shipping Information</h5>
              </Card.Header>
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
                        required
                      />
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
                        required
                      />
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
                    required
                  />
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
                        required
                      />
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
                        required
                      />
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
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header>
                <h5>Payment Method</h5>
              </Card.Header>
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
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
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
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
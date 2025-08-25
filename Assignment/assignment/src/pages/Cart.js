import React from 'react';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, incrementQty, decrementQty, getCartSubtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 >Shopping Cart</h2>
        <p className="text-muted mb-4">Your cart is empty</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="ecommerce-cart-page">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <Row>
        <Col lg={8}>
          <Table responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        className="me-3"
                      />
                      <div>
                        <h6 className="mb-0">{item.title}</h6>
                        <small className="text-muted">{item.name}</small>
                      </div>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => decrementQty(item.id)}
                        disabled={item.qty <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="mx-3">{item.qty}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => incrementQty(item.id)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </td>
                  <td>${(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center">
            <ArrowLeft size={18} className="me-2" />
            Continue Shopping
          </Link>
        </Col>
        
        <Col lg={4}>
          <Card className="ecommerce-cart-summary"> 
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>${getCartSubtotal().toFixed(2)}</strong>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
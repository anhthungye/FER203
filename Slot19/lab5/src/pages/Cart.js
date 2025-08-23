import React, { useState } from 'react';
import { Container, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    confirmOrder,
    payOrder,
    totalValue,
    orderConfirmed,
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = (item.quantity || 1) + change;
      if (newQuantity < 1) {
        removeFromCart(productId);
        showToast('Item removed from cart', 'info');
      } else {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    await confirmOrder();
    setIsConfirming(false);
    setConfirmMessage('Your order has been confirmed!');
    setTimeout(() => setConfirmMessage(''), 3000);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      showToast('Please login to proceed with payment', 'warning');
      navigate('/login');
      return;
    }

    setIsPaying(true);
    await payOrder();
    setIsPaying(false);
    setPaymentMessage('Payment successful! Thank you for your purchase.');
    setTimeout(() => setPaymentMessage(''), 3000);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info" className="empty-cart">
          {orderConfirmed ? 'Your order has been processed. Thank you!' : 'Your cart is empty.'}
          <div className="empty-cart-button">
            <Button as={Link} to="/" variant="primary">
              Continue Shopping
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          <ListGroup className="cart-items">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="cart-item"
              >
                <div className="cart-item-info">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price}</div>
                  </div>
                </div>
                
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="quantity-btn"
                    >
                      -
                    </Button>
                    <span className="quantity-display">{item.quantity || 1}</span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="quantity-btn"
                    >
                      +
                    </Button>
                  </div>
                  
                  <div className="cart-item-total">
                    ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                  </div>
                  
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="cart-summary">
            <p className="cart-total-items">
              Total items: {cartItems.reduce((s, i) => s + (i.quantity || 1), 0)}
            </p>
            <p className="cart-total-value">
              Total value: ${totalValue}
            </p>
          </div>

          <div className="cart-actions">
            <Button variant="outline-secondary" onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </Button>
            
            <Button variant="outline-primary" onClick={handleContinueShopping} className="continue-shopping-btn">
              Continue Shopping
            </Button>

            {!orderConfirmed && (
              <Button variant="success" onClick={handleConfirmOrder} disabled={isConfirming} className="confirm-order-btn">
                {isConfirming ? "Confirming..." : "Confirm Order"}
              </Button>
            )}

            {orderConfirmed && (
              <Button variant="primary" onClick={handlePayment} disabled={isPaying} className="payment-btn">
                {isPaying ? "Processing Payment..." : "Payment"}
              </Button>
            )}
          </div>
        </>
      )}

      {confirmMessage && (
        <Alert variant="success" className="cart-message">
          {confirmMessage}
        </Alert>
      )}
      
      {paymentMessage && (
        <Alert variant="success" className="cart-message">
          {paymentMessage}
        </Alert>
      )}
    </Container>
  );
};

export default Cart;
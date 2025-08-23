import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, ListGroup, Alert } from "react-bootstrap";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    confirmOrder,
    payOrder,
    totalValue,
    orderConfirmed,
  } = useContext(CartContext);

  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    await confirmOrder();
    setIsConfirming(false);
    setConfirmMessage("Your order has been confirmed!");
    setTimeout(() => setConfirmMessage(""), 3000);
  };

  const handlePayment = async () => {
    setIsPaying(true);
    await payOrder();
    setIsPaying(false);
    setPaymentMessage("Payment successful! Thank you for your purchase.");
    setTimeout(() => setPaymentMessage(""), 3000);
  };

  return (
    <div className="cart">
      <h2 className="dishes-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <>
          <ListGroup className="mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.name} &nbsp;
                  <small className="text-muted">(x{item.quantity ?? 1})</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span>${(parseFloat(item.price) * (item.quantity ?? 1)).toFixed(2)}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mb-3">
            <p>Total items: {cartItems.reduce((s, i) => s + (i.quantity ?? 1), 0)}</p>
            <p>Total value: ${totalValue}</p>
          </div>

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>

            {!orderConfirmed && (
              <Button variant="success" onClick={handleConfirmOrder} disabled={isConfirming}>
                {isConfirming ? "Confirming..." : "Confirm Order"}
              </Button>
            )}

            {orderConfirmed && (
              <Button variant="primary" onClick={handlePayment} disabled={isPaying}>
                {isPaying ? "Processing Payment..." : "Payment"}
              </Button>
            )}
          </div>
        </>
      )}

      {confirmMessage && <Alert className="mt-3" variant="success">{confirmMessage}</Alert>}
      {paymentMessage && <Alert className="mt-3" variant="success">{paymentMessage}</Alert>}
    </div>
  );
};

export default Cart;

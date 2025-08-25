import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();

  return (
    <div className="ecommerce-wishlist-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Wishlist</h2>
        <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center">
          <ArrowLeft size={18} className="me-2" />
          Continue Shopping
        </Link>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-5">
          <Heart size={64} className="text-muted mb-3" />
          <h4>Your wishlist is empty</h4>
          <p className="text-muted">Add items to your wishlist to save them for later</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <Row>
          {items.map(product => (
            <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.title}
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6">{product.title}</Card.Title>
                  <Card.Text className="text-muted small">{product.name}</Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">${product.price}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromWishlist(product.id)}
                        className="d-flex align-items-center"
                      >
                        Remove
                      </Button>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-primary btn-sm d-flex align-items-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Wishlist;
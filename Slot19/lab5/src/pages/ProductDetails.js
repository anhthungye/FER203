import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourites();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="product-details-container">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Button as={Link} to="/" variant="primary">
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleAddToFavourite = () => {
    if (!isAuthenticated) {
      showToast('Please login to add favourites', 'warning');
      return;
    }
    addToFavourites(product);
    showToast('Added to favourites', 'success');
  };

  const handleBackToList = () => {
    navigate('/');
  };

  const handleBrowseFavourites = () => {
    navigate('/favourites');
  };

  return (
    <Container className="product-details-container">
      <Button 
        variant="outline-secondary" 
        onClick={handleBackToList}
        className="back-button"
      >
        ← Back to List
      </Button>

      <Row className="product-details-row">
        <Col md={6} className="product-image-col">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-detail-image"
          />
        </Col>
        <Col md={6} className="product-info-col">
          <Card className="product-info-card">
            <Card.Body>
              <Card.Title as="h2" className="product-detail-title">{product.name}</Card.Title>
              <Card.Text as="h4" className="product-detail-price">
                ${product.price}
              </Card.Text>
              <Card.Text className="product-detail-description">{product.description}</Card.Text>
              <Card.Text className="product-detail-category">
                <strong>Category:</strong> {product.category}
              </Card.Text>
              
              <div className="product-detail-buttons">
                <Button variant="primary" onClick={handleAddToCart} className="detail-add-to-cart">
                  Add to Cart
                </Button>
                
                {isFavourite(product.id) ? (
                  <Button variant="outline-danger" onClick={handleBrowseFavourites} className="browse-favourites">
                    Browse to My Favourites
                  </Button>
                ) : (
                  <Button variant="outline-danger" onClick={handleAddToFavourite} className="add-to-favourite">
                    Add to Favourite
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

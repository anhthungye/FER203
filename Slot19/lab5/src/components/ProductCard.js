import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite, removeFromFavourites } = useFavourites();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleAddToFavourite = () => {
    if (!isAuthenticated) {
      showToast('Please login to add favourites', 'warning');
      navigate('/login');
      return;
    }

    if (isFavourite(product.id)) {
      removeFromFavourites(product.id);
      showToast('Removed from favourites', 'info');
    } else {
      addToFavourites(product);
      showToast('Added to favourites', 'success');
    }
  };

  return (
    <Card className="product-card h-100">
      <div className="card-image-container">
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </div>
      
      <Card.Body className="card-body">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="card-description">{product.description}</Card.Text>
        <Card.Text className="product-price">
          <strong>${product.price}</strong>
        </Card.Text>
        
        <div className="card-buttons">
          <Button 
            as={Link} 
            to={`/products/${product.id}`} 
            variant="outline-primary"
            className="view-details-btn"
          >
            View Details
          </Button>
          
          <div className="action-buttons">
            <Button 
              variant="primary" 
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart
            </Button>
            
            <Button 
              variant={isFavourite(product.id) ? "danger" : "outline-danger"}
              onClick={handleAddToFavourite}
              className="favourite-btn"
            >
              {isFavourite(product.id) ? "♥" : "♡"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
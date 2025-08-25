import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useToast();
  const { decreaseStock } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  const isOnSale = product.tags?.includes('sale');
  const isHot = product.tags?.includes('hot');

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) {
      addToast('Out of stock!', 'danger');
      return;
    }
    addToCart(product);
    decreaseStock(product.id);
    addToast('Added to cart!', 'success');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      addToast('Please sign in to save items to your wishlist', 'info');
      navigate(`/login?redirect_uri=${location.pathname}`);
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addToast('Removed from wishlist', 'success');
    } else {
      addToWishlist(product);
      addToast('Added to wishlist!', 'success');
    }
  };

  return (
    <Card className="h-100 product-card ecommerce-product-card">
      <div className="ecommerce-product-image-wrapper">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '500px', objectFit: 'cover' }}
        />
        {isHot && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            Hot
          </Badge>
        )}
        {isOnSale && (
          <Badge bg="success" className="position-absolute top-0 end-0 m-2">
            Sale
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{product.title}</Card.Title>
        <Card.Text className="text-muted small">{product.name}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            {isOnSale ? (
              <>
                <span className="fw-bold text-danger">${product.salePrice}</span>
                <span className="text-muted text-decoration-line-through">${product.price}</span>
              </>
            ) : (
              <span className="fw-bold">${product.price}</span>
            )}
          </div>
          <p className="small text-muted mb-2">Stock: {product.stock}</p>
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="d-flex align-items-center"
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={16} className="me-1" />
              Add to Cart
            </Button>
            <Button
              variant={isInWishlist(product.id) ? "success" : "outline-secondary"}
              size="sm"
              onClick={handleAddToWishlist}
              className="d-flex align-items-center"
            >
              <Heart size={16} className="me-1" />
            </Button>
            <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

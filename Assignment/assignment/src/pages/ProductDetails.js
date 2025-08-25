import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, decreaseStock } = useProducts();
  const product = products.find(p => String(p.id) === String(id));

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useToast();

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const isOnSale = product.tags?.includes('sale');
  const isHot = product.tags?.includes('hot');

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      addToast('Out of stock!', 'danger');
      return;
    }
    addToCart(product);
    decreaseStock(product.id);
    addToast('Added to cart!', 'success');
  };

  const handleAddToWishlist = () => {
    if (!user) {
      addToast('Please sign in to save items to your wishlist', 'info');
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
    <div className="ecommerce-product-details">
      <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center ctn">
          <ArrowLeft size={18} className="me-2" />
            Continue Shopping
      </Link>
      <Row>
        <Col md={6}>
          <div className="position-relative">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
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
        </Col>

        <Col md={6}>
          <h1>{product.title}</h1>
          <p className="text-muted">By {product.name}</p>

          <div className="my-3">
            {isOnSale ? (
              <div>
                <h3 className="text-danger">${product.salePrice}</h3>
                <p className="text-muted text-decoration-line-through">${product.price}</p>
              </div>
            ) : (
              <h3>${product.price}</h3>
            )}
          </div>

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Release Date:</strong> {product.releaseDate}</p>
          <p><strong>Available Stock:</strong> {product.stock}</p>

          {product.colors?.length > 0 && (
            <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
          )}
          {product.storageOptions?.length > 0 && (
            <p><strong>Storage Options:</strong> {product.storageOptions.join(", ")}</p>
          )}

          <h5>Features</h5>
          <ListGroup className="mb-3">
            {product.features?.map((f, i) => (
              <ListGroup.Item key={i}>{f}</ListGroup.Item>
            ))}
          </ListGroup>

          <p className="mb-4"><strong>Description:</strong> {product.description}</p>

          <div className="d-flex gap-2 mb-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="d-flex align-items-center"
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={20} className="me-2" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              variant={isInWishlist(product.id) ? "success" : "outline-secondary"}
              size="lg"
              onClick={handleAddToWishlist}
              className="d-flex align-items-center"
            >
              <Heart size={20} />
            </Button>
          </div>

          
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;

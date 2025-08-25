import React from 'react';
import { Navbar, Nav, Badge, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Heart, User, LogIn, LogOut, CreditCard } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const displayName = user?.fullName || user?.username || user?.email || 'Account';

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm ecommerce-header">
      <Navbar.Brand href="/" className="fw-bold fs-3">E-Commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-primary" className="d-flex align-items-center">
                <User size={18} className="me-1" />
                {displayName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <LinkContainer to="/profile">
                  <Dropdown.Item>
                    <User size={16} className="me-2" />
                    Account
                  </Dropdown.Item>
                </LinkContainer>
                <LinkContainer to="/wishlist">
                  <Dropdown.Item>
                    <Heart size={16} className="me-2" />
                    Wishlist
                    {wishlistItems.length > 0 && (
                      <Badge bg="primary" className="ms-2">
                        {wishlistItems.length}
                      </Badge>
                    )}
                  </Dropdown.Item>
                </LinkContainer>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  <LogOut size={16} className="me-2" />
                    Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link className="d-flex align-items-center">
                <LogIn size={18} className="me-1" />
                Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          
          <LinkContainer to="/wishlist">
            <Nav.Link className="d-flex align-items-center position-relative">
              <Heart size={18} className="me-1" />
              Wishlist
              {wishlistItems.length > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {wishlistItems.length}
                </Badge>
              )}
            </Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/cart">
            <Nav.Link className="d-flex align-items-center position-relative">
              <ShoppingCart size={18} className="me-1" />
              Cart
              {getCartCount() > 0 && (
                <Badge bg="primary" className="position-absolute top-0 start-100 translate-middle">
                  {getCartCount()}
                </Badge>
              )}
            </Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/checkout">
            <Nav.Link className="d-flex align-items-center">
              <CreditCard size={18} className="me-1" />
              Checkout
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
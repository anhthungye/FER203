import React from 'react'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const CustomNavbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand 
          className="fw-bold text-primary cursor-pointer"
          onClick={() => navigate('/')}
        >
          Mobile Store
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
            <Button 
              variant="outline-danger" 
              className="me-2 position-relative"
              onClick={() => navigate('/favourites')}
            >
              <FaHeart />
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6rem' }}
              >
                0
              </Badge>
            </Button>
            
            <Button 
              variant="outline-success" 
              className="me-2 position-relative"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart />
              <Badge 
                bg="success" 
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6rem' }}
              >
                {getCartCount()}
              </Badge>
            </Button>
            
            {user ? (
              <Button variant="outline-secondary" onClick={handleLogout}>
                <FaUser className="me-1" />
                Logout ({user.email})
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={handleLoginClick}>
                <FaUser className="me-1" />
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
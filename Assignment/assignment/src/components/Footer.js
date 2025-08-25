import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-4 mt-auto ecommerce-footer">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2025 E-Commerce Store. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a 
              href="https://github.com/anhthungye" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light text-decoration-none d-inline-flex align-items-center"
            >
              <Github size={16} className="me-1" />
              Anh Thu
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
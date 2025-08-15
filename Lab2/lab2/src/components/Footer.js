import { Container, Row, Col } from 'react-bootstrap';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Movie Explorer</h5>
            <p className="text-muted">
              Discover your next favorite movie with our curated collection.
            </p>
          </Col>
          
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/favorites" className="text-decoration-none text-light">Favorites</a></li>
              <li><a href="/request" className="text-decoration-none text-light">Request Movie</a></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3">
              <a href="https://github.com/yourusername" className="text-light">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/yourprofile" className="text-light">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@movieexplorer.com" className="text-light">
                <Mail size={20} />
              </a>
              <a href="https://twitter.com/yourhandle" className="text-light">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-muted mt-2">
              © {new Date().getFullYear()} Movie Explorer. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
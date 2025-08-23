import React from 'react';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import ProductCard from '../components/ProductCard';
import '../styles/Favourites.css';

const Favourites = () => {
  const { favourites, clearFavourites } = useFavourites();

  return (
    <Container className="favourites-container">
      <div className="favourites-header">
        <h1 className="favourites-title">My Favourites</h1>
        {favourites.length > 0 && (
          <Button variant="outline-danger" onClick={clearFavourites} className="clear-favourites-btn">
            Clear All Favourites
          </Button>
        )}
      </div>

      {favourites.length === 0 ? (
        <Alert variant="info" className="empty-favourites">
          You don't have any favourite products yet.
          <div className="empty-favourites-button">
            <Button as={Link} to="/" variant="primary">
              Browse Products
            </Button>
          </div>
        </Alert>
      ) : (
        <Row className="favourites-grid">
          {favourites.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
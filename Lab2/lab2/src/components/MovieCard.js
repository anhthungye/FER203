import PropTypes from 'prop-types';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import { Heart, Info } from 'lucide-react';
import { useState } from 'react';

function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={movie.title}
          style={{ height: '600px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="text-muted mb-2">
            {movie.description.substring(0, 80)}...
          </Card.Text>
          <div className="mt-auto">
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">{movie.year}</small>
              <small className="text-muted">{movie.country}</small>
              <small className="text-muted">{movie.duration} min</small>
            </div>
            <Badge bg="secondary" className="mb-3">
              {movie.genre}
            </Badge>
            <div className="d-flex justify-content-between">
              <Button 
                variant={isFavorite ? 'danger' : 'outline-danger'}
                onClick={() => onToggleFavorite(movie.id)}
                size="sm"
              >
                <Heart size={16} className="me-1" />
                {isFavorite ? 'Remove' : 'Add'}
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={() => setShowModal(true)}
                size="sm"
              >
                <Info size={16} className="me-1" />
                Details
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for movie details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="img-fluid mb-3"
          />
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <p className="text-muted mt-3">Showtimes: 2:30 PM, 5:45 PM, 8:15 PM</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MovieCard;
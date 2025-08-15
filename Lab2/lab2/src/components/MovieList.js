import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Toast, ToastContainer, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import MovieCard from './MovieCard'
import { Calendar, MapPin, Clock } from 'lucide-react'

const LS_KEY = 'favourites'

const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] } catch { return [] }
  })
  const [toast, setToast] = useState({ show: false, text: '', variant: 'success' })

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(favourites)) }, [favourites])

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const exists = prev.includes(id)
      setToast({ show: true, text: exists ? 'Removed from favourites' : 'Added to favourites!', variant: exists ? 'warning' : 'success' })
      return exists ? prev.filter((x) => x !== id) : [...prev, id]
    })
  }

  if (!movies.length) return <Alert variant="warning">No movies found</Alert>

  return (
    <>
      <Row xs={1} sm={2} lg={3} className="g-3">
        {movies.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} isFavourite={favourites.includes(m.id)} onToggleFavourite={toggleFavourite} onOpenDetails={setSelectedMovie} />
          </Col>
        ))}
      </Row>
      <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)} centered size="lg">
        {selectedMovie && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedMovie.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-5"><img src={selectedMovie.poster} alt={selectedMovie.title} className="w-100 rounded-3 object-fit-cover" /></div>
                <div className="col-md-7">
                  <p className="mb-2 text-muted">{selectedMovie.description}</p>
                  <div className="mb-2 d-flex flex-wrap gap-3 small text-muted">
                    <span className="d-flex align-items-center gap-1"><Calendar size={14} /> {selectedMovie.year}</span>
                    <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {selectedMovie.country}</span>
                    <span className="d-flex align-items-center gap-1"><Clock size={14} /> {selectedMovie.duration} minutes</span>
                  </div>
                  <hr />
                  <p className="mb-0 small text-muted">Showtimes: Fri 19:00 • Sat 16:00 • Sun 20:30</p>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
      <ToastContainer position="bottom-center" className="mb-4">
        <Toast onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={2000} autohide bg={toast.variant}>
          <Toast.Body className="text-white">{toast.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
}

export default MovieList
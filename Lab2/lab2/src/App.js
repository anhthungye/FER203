import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { movies, allGenres } from './movies';
import CustomNavbar from './components/Navbar';
import CarouselHero from './components/MovieCarousel';
import MovieCard from './components/MovieCard';
import SearchFilterBar from './components/SearchFilterBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieRequestForm from './components/MovieForm';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('none');
  const [favorites, setFavorites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredMovies = useMemo(() => {
    let result = [...movies];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(term) || 
        movie.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(movie => movie.genre === selectedGenre);
    }
    
    // Sort by duration
    if (sortOption === 'duration_asc') {
      result.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === 'duration_desc') {
      result.sort((a, b) => b.duration - a.duration);
    }
    
    return result;
  }, [searchTerm, selectedGenre, sortOption]);

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        setToastMessage('Removed from favorites');
        return prev.filter(id => id !== movieId);
      } else {
        setToastMessage('Added to favorites!');
        return [...prev, movieId];
      }
    });
    setShowToast(true);
  };

  const handleSubmitRequest = (formData) => {
    console.log('Movie request submitted:', formData);
    // In a real app, you would send this to an API
  };

  return (
    <Router>
      <CustomNavbar />
      <Container className="mt-5 pt-4">
        <Routes>
          <Route path="/" element={
            <>
              <CarouselHero />
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                sortOption={sortOption}
                onSortChange={setSortOption}
                movieCount={filteredMovies.length}
                genres={allGenres}
              />
              {filteredMovies.length === 0 ? (
                <Alert variant="info">No movies found matching your criteria.</Alert>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredMovies.map(movie => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(movie.id)}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          } />
          <Route path="/favorites" element={
            favorites.length === 0 ? (
              <Alert variant="info">No favorites yet.</Alert>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {movies
                  .filter(movie => favorites.includes(movie.id))
                  .map(movie => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={true}
                      />
                    </Col>
                  ))}
              </Row>
            )
          } />
          <Route path="/request" element={
            <MovieRequestForm onSubmit={handleSubmitRequest} />
          } />
        </Routes>
      </Container>
      <Footer />
      
      <ToastNotification
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </Router>
  );
}

export default App;
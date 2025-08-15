import PropTypes from 'prop-types';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Search, Filter, Clock } from 'lucide-react';

function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortOption,
  onSortChange,
  movieCount,
  genres
}) {
  return (
    <Row className="mb-4 g-3">
      <Col md={6}>
        <InputGroup>
          <InputGroup.Text>
            <Search size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={3}>
        <InputGroup>
          <InputGroup.Text>
            <Filter size={18} />
          </InputGroup.Text>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Col>
      <Col md={3}>
        <InputGroup>
          <InputGroup.Text>
            <Clock size={18} />
          </InputGroup.Text>
          <Form.Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="none">None</option>
            <option value="duration_asc">Duration ↑</option>
            <option value="duration_desc">Duration ↓</option>
          </Form.Select>
        </InputGroup>
      </Col>
      <Col xs={12}>
        <p className="text-muted">Showing {movieCount} movies</p>
      </Col>
    </Row>
  );
}

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  movieCount: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchFilterBar;
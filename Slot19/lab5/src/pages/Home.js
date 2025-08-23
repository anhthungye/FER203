import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products } from '../data/products';
import '../styles/Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map(product => product.category))];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Sorting logic
    switch (sortOption) {
      case 'price-low':
        return [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-high':
        return [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      case 'default':
      default:
        return filtered; 
    }
  }, [searchTerm, sortOption, filterCategory]);

  return (
    <Container className="home-container">
      <h1 className="home-title">Welcome to Our Restaurant</h1>

      <Carousel autoPlay={true} interval={4000} />

      <h2 className="products-section-title mt-4 text-center">Our Products</h2>

      <div className="filters-container mt-4">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search products..."
        />

        <div className="filter-controls mt-2 d-flex gap-2">
          <Form.Select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="filter-select"
          >
            <option value="default">Default Order</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </Form.Select>

          <Form.Select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <Row className="products-grid">
        {filteredAndSortedProducts.map(product => (
          <Col key={product.id} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </Container>
  );
};

export default Home;

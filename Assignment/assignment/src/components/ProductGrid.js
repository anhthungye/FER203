import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [brandFilter, setBrandFilter] = useState('all');

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Lấy danh sách brand duy nhất
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.name))];
    return uniqueBrands;
  }, [products]);

  // Lọc + sắp xếp
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search theo title
    if (debouncedQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    // Lọc theo brand (name)
    if (brandFilter !== 'all') {
      filtered = filtered.filter(product => product.name === brandFilter);
    }

    // Sort
    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, debouncedQuery, sortOption, brandFilter]);

  return (
    <div className="ecommerce-product-section">
      <div className="ecommerce-search-controls">
        <Row className="mb-4 g-2">
          {/* Search */}
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <Search size={18} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>

          {/* Sort */}
          <Col md={4}>
            <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="name-asc">Name A→Z</option>
              <option value="name-desc">Name Z→A</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </Form.Select>
          </Col>

          {/* Filter theo brand */}
          <Col md={4}>
            <Form.Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>

      <Row>
        {filteredAndSortedProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;

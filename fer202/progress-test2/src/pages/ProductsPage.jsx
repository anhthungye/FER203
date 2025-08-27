import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap'
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import CustomNavbar from '../components/Navbar'
import { useProductFilters } from '../hooks/useProductFilters'
import api from '../services/api'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [filterBy, setFilterBy] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products')
        const normalized = (data || []).map(p => ({
          id: p.id,
          name: p.name || p.title,
          image: p.image || `https://picsum.photos/seed/${p.id}/600/400`,
          price: p.price,
          description: p.description,
          category: p.category
        }))
        setProducts(normalized)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useProductFilters(products, searchQuery, sortBy, filterBy)

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-4 text-center">
          <div>Loading products...</div>
        </Container>
      </>
    )
  }

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-4">
        <h1 className="mb-4">Products</h1>
        
        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
              </Col>
              
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaFilter /></InputGroup.Text>
                  <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="oppo">Oppo</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaSort /></InputGroup.Text>
                  <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Name A→Z</option>
                    <option value="name-desc">Name Z→A</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {filteredProducts.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <Row className="mt-4">
            <Col>
              <Card className="text-center">
                <Card.Body>No products found.</Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}
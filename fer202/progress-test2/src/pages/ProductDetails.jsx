import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap'
import { FaArrowLeft, FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa'
import api from '../services/api'
import { formatPrice } from '../utils/format'
import CustomNavbar from '../components/Navbar'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFavourite, setIsFavourite] = useState(false)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch (err) {
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    showToast('Đã thêm vào giỏ hàng!')
  }

  const handleToggleFavourite = () => {
    setIsFavourite(!isFavourite)
    showToast(
      isFavourite 
        ? 'Đã xóa khỏi danh sách yêu thích!' 
        : 'Đã thêm vào danh sách yêu thích!'
    )
  }

  if (loading) return (
    <>
      <CustomNavbar />
      <Container className="py-4 text-center">Loading...</Container>
    </>
  )
  
  if (error) return (
    <>
      <CustomNavbar />
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    </>
  )

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-4">
        <Button 
          variant="outline-secondary" 
          className="mb-3" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back to Products
        </Button>

        {product && (
          <Row>
            <Col md={6}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0">
                <Card.Body>
                  <Card.Title as="h2">{product.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {product.description}
                  </Card.Text>
                  
                  <div className="mb-3">
                    <Badge bg="primary" className="fs-4">
                      {formatPrice(product.price)}
                    </Badge>
                    <Badge bg="secondary" className="ms-2 fs-6">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="d-grid gap-2 d-md-flex">
                    <Button variant="primary" size="lg" onClick={handleAddToCart}>
                      <FaCartPlus className="me-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant={isFavourite ? "danger" : "outline-danger"} 
                      size="lg"
                      onClick={handleToggleFavourite}
                    >
                      {isFavourite ? (
                        <FaHeart className="me-2" />
                      ) : (
                        <FaRegHeart className="me-2" />
                      )}
                      {isFavourite ? 'Remove from' : 'Add to'} Favorites
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h5>Product Details</h5>
                    <ul>
                      <li>Brand: {product.category}</li>
                      <li>SKU: {product.id}</li>
                      <li>In Stock: Yes</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}
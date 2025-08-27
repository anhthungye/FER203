import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap'
import { FaEye, FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa'
import { formatPrice } from '../utils/format'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [isFavourite, setIsFavourite] = useState(false)

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

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

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
        onClick={handleViewDetails}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title 
          className="h6 mb-2 cursor-pointer"
          onClick={handleViewDetails}
        >
          {product.name}
        </Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </Card.Text>
        
        <div className="mb-3">
          <Badge bg="primary" className="fs-6">
            {formatPrice(product.price)}
          </Badge>
        </div>

        <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleViewDetails}
            className="flex-fill d-flex align-items-center justify-content-center"
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          
          <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            className="flex-fill d-flex align-items-center justify-content-center"
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          
          <Button
            variant={isFavourite ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleToggleFavourite}
            className="flex-fill d-flex align-items-center justify-content-center"
          >
            {isFavourite ? (
              <FaHeart className="me-1" />
            ) : (
              <FaRegHeart className="me-1" />
            )}
            Favourite
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import CustomNavbar from '../components/Navbar'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()
  const { showToast } = useToast()

  const validateForm = () => {
    let valid = true
    setEmailError('')
    setPasswordError('')

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError('Email is required.')
      valid = false
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.')
      valid = false
    }

    // password validation
    if (!password) {
      setPasswordError('Password is required.')
      valid = false
    }

    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const { data: accounts } = await api.get('/accounts')
      const account = accounts.find(
        acc => acc.email === email && acc.password === password
      )

      if (account) {
        if (account.isActive) {
          login(account)
          showToast('Login successful!')
          navigate('/')
        } else {
          setError('Your account has been locked. Please contact the administrator.')
        }
      } else {
        setError('Incorrect email or password.')
      }
    } catch {
      setError('An error occurred while logging in. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEmail('')
    setPassword('')
    setError('')
    setEmailError('')
    setPasswordError('')
  }

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title as="h2" className="text-center mb-4">Login</Card.Title>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!emailError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!passwordError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {passwordError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-50" 
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <Button 
                      variant="secondary" 
                      type="button" 
                      className="w-50"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

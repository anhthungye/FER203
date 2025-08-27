import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import ProductDetails from '../pages/ProductDetails'
import LoginPage from '../pages/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
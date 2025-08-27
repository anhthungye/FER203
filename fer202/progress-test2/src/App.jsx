import './App.css'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div className='App'>
            <AppRoutes />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
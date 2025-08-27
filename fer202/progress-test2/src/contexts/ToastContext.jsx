import React, { createContext, useContext, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = (message, options = {}) => {
    const id = Date.now()
    const toast = {
      id,
      message,
      variant: options.variant || 'success',
      delay: options.delay || 3000
    }
    
    setToasts(prev => [...prev, toast])
    
    if (toast.delay !== null) {
      setTimeout(() => {
        removeToast(id)
      }, toast.delay)
    }
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const value = {
    showToast
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            bg={toast.variant}
            show={true}
            autohide={toast.delay !== null}
            delay={toast.delay}
            onClose={() => removeToast(toast.id)}
          >
            <Toast.Header>
              <strong className="me-auto">Thông báo</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}
import { Toast } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import PropTypes from 'prop-types';

function ToastNotification({ show, onClose, message }) {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <Toast onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <Heart className="me-2" fill="red" color="red" size={20} />
          <strong className="me-auto">Favorites</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
}

ToastNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastNotification;
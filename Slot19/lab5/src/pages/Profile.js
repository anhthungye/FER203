import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <Container className="profile-container">
        <div className="profile-not-logged-in">
          <h2>Please log in to view your profile</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      
      <Card className="profile-card">
        <Card.Body>
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
          </div>
          
          <div className="d-grid">
            <Button variant="outline-danger" onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
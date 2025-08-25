import React from "react";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8} lg={6}>
        <Card className="shadow-sm ecommerce-profile-card">
          <Card.Header className="d-flex align-items-center">
            <User size={20} className="me-2 text-primary" />
            <h5 className="mb-0">My Profile</h5>
          </Card.Header>
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <div
                className="border rounded-circle overflow-hidden me-3"
                style={{ width: "80px", height: "80px" }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                    <User size={32} />
                  </div>
                )}
              </div>
              <div>
                <h5 className="mb-1">{user.fullName || user.username}</h5>
                <p className="mb-0 text-muted">{user.email}</p>
              </div>
            </div>

            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <strong>Username:</strong> {user.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Full Name:</strong> {user.fullName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {user.email}
              </ListGroup.Item>
              {user.secretQuestion && (
                <ListGroup.Item>
                  <strong>Secret Question:</strong> {user.secretQuestion}
                  <br />
                  <strong>Answer:</strong> {user.answer}
                </ListGroup.Item>
              )}
            </ListGroup>

            <div className="text-center">
              <Button
                variant="danger"
                className="d-flex align-items-center justify-content-center mx-auto"
                onClick={handleLogout}
              >
                <LogOut size={18} className="me-2" />
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;

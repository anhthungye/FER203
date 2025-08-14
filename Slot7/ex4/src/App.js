import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "/images/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "/images/student2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "/images/student3.jpg" },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Student Management</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Welcome name={userData.name} />
        <Row>
          <Col md={4}>
            <UserProfile user={userData} />
            <NameList names={namesList} />
          </Col>
          <Col md={8}>
            <h3 className="mb-4 text-center">Student Information</h3>
            <Row>
              {students.map((student, index) => (
                <Col key={index} sm={12} md={6} lg={4}>
                  <StudentCard student={student} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

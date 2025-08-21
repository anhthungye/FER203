import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { CartProvider, CartContext } from "./context/CartContext";
import { ShoppingCart } from "lucide-react";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import DarkModeToggle from "./components/DarkModeToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const dishes = [
  { id: 0, name: "Uthappizza", image: "/images/uthappizza.jpg", price: "4.99", description: "A unique combination of Indian Uthappam and Italian pizza." },
  { id: 1, name: "Zucchipakoda", image: "/images/zucchipakoda.jpg", price: "1.99", description: "Deep fried Zucchini with chickpea batter." },
  { id: 2, name: "Vadonut", image: "/images/vadonut.jpg", price: "1.99", description: "A combination of vada and donut." },
  { id: 3, name: "ElaiCheese Cake", image: "/images/elaicheesecake.jpg", price: "2.99", description: "New York Style Cheesecake with Indian cardamoms." },
];

function NavigationBar() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Restaurant</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/">Home</Nav.Link>

          <Nav.Link as={Link} to="/cart" className="position-relative me-2">
            <ShoppingCart size={24} />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem", minWidth: 18, lineHeight: "18px" }}
            >
              {totalQuantity}
            </span>
          </Nav.Link>

          <DarkModeToggle />
        </Nav>
      </Container>
    </Navbar>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <NavigationBar />
        <Container className="my-4">
          <Routes>
            <Route path="/" element={<DishesList dishes={dishes} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
}

export default App;

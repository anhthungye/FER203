import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import SearchBar from "./SearchBar";
import { Card, Button, Row, Col } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3 text-center dishes-title">Dishes List</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Row className="dishes-grid">
        {filteredDishes.map((dish) => (
            <Card className="dish-card" key={dish.id}>
            <Card.Img variant="top" src={dish.image} alt={dish.name} />
            <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text>
                <strong>${dish.price}</strong>
                </Card.Text>
                <Button className="btn-pastel btn-pastel-primary" onClick={() => addToCart(dish)}>
                Add to Cart
                </Button>
            </Card.Body>
            </Card>
        ))}
        </Row>
    </div>
  );
};

export default DishesList;

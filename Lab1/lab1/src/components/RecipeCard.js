import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Users, Clock, ChefHat, Heart } from "lucide-react";

const RecipeCard = ({ recipe, onView, onAddFavourite, isFavourited }) => (
  <Card className="h-100 shadow-sm border-0 recipe-card custom-font" style={{ minHeight: 430 }}>
    <Card.Img 
      variant="top"
      src={recipe.image}
      alt={recipe.title}
      style={{height: '260px', objectFit: 'cover'}}
    />
    <Card.Body>
      <Card.Title>{recipe.title}</Card.Title>
      <Card.Text className="text-muted small">{recipe.description}</Card.Text>
      <div className="d-flex align-items-center gap-3 mb-3 small text-muted">
        <div className="d-flex align-items-center">
          <Users size={14} className="me-1" color="#ff9800" />
          <span>Servings: {recipe.servings}</span>
        </div>
        <div className="d-flex align-items-center">
          <Clock size={14} className="me-1" color="#ff9800" />
          <span>Prep: {recipe.prep} mins</span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 mb-4 small text-muted">
        <div className="d-flex align-items-center">
          <ChefHat size={14} className="me-1" color="#ff9800" />
          <span>Cook: {recipe.cook} mins</span>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Button
          variant={isFavourited ? "danger" : "outline-danger"}
          className="rounded-pill"
          onClick={() => onAddFavourite(recipe)}
          disabled={isFavourited}
        >
          <Heart size={16} className="me-1" fill={isFavourited ? "#dc3545" : "none"} />
          {isFavourited ? "Favourited" : "Add to Favourite"}
        </Button>
        {isFavourited && <Badge bg="danger">♥</Badge>}
      </div>
      <Button variant="success" className="w-100 rounded-pill custom-btn custom-btn-view" onClick={() => onView(recipe)}>
        View Recipe
      </Button>
    </Card.Body>
  </Card>
);

export default RecipeCard;
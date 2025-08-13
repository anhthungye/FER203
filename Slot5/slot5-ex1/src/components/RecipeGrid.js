import React, { useState, useMemo } from "react";
import { Row, Col, Container } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal";

const RecipeGrid = ({ recipes, filters }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    const query = filters.query || "";
    return recipes.filter((recipe) => {
      const withinPrep = recipe.prep <= filters.maxPrep;
      const withinCook = recipe.cook <= filters.maxCook;
      const matchQuery = query
        ? recipe.title.toLowerCase().includes(query) || 
          recipe.description.toLowerCase().includes(query)
        : true;
      return withinPrep && withinCook && matchQuery;
    });
  }, [recipes, filters]);

  return (
    <>
      <Container className="py-5">
        <Row className="g-4">
          {filteredRecipes.map((recipe) => (
            <Col key={recipe.id} xs={12} md={6} lg={4}>
              <RecipeCard recipe={recipe} onView={setSelectedRecipe} />
            </Col>
          ))}
          {filteredRecipes.length === 0 && (
            <Col xs={12} className="text-center text-muted py-5">
              <h4>No recipes found</h4>
              <p>Try adjusting your filters or search terms.</p>
            </Col>
          )}
        </Row>
      </Container>
      <Modal 
        show={!!selectedRecipe} 
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
      />
    </>
  );
};

export default RecipeGrid;
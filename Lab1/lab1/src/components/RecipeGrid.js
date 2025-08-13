import React, { useState, useMemo } from "react";
import { Row, Col, Container, Pagination, Form } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal";

const getSortedRecipes = (recipes, sortBy) => {
  let sorted = [...recipes];
  if (sortBy === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "name-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
  if (sortBy === "prep-asc") sorted.sort((a, b) => a.prep - b.prep);
  if (sortBy === "prep-desc") sorted.sort((a, b) => b.prep - a.prep);
  if (sortBy === "cook-asc") sorted.sort((a, b) => a.cook - b.cook);
  if (sortBy === "cook-desc") sorted.sort((a, b) => b.cook - a.cook);
  return sorted;
};

const RecipeGrid = ({
  recipes,
  filters,
  sortBy,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  onAddFavourite,
  favourites,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filter
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

  // Sort
  const sortedRecipes = useMemo(
    () => getSortedRecipes(filteredRecipes, sortBy),
    [filteredRecipes, sortBy]
  );

  // Pagination
  const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container className="py-5">
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={6}>
            <Form.Select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: 140, display: "inline-block" }}
            >
              <option value={6}>6 per page</option>
              <option value={9}>9 per page</option>
              <option value={12}>12 per page</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-md-end mt-2 mt-md-0">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </Col>
        </Row>
        <Row className="g-4">
          {paginatedRecipes.map((recipe, idx) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <RecipeCard
                recipe={recipe}
                onView={setSelectedRecipe}
                onAddFavourite={onAddFavourite}
                isFavourited={!!favourites.find(f => f.title === recipe.title)}
              />
            </Col>
          ))}
          {paginatedRecipes.length === 0 && (
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
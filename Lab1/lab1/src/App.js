import React, { useState, useCallback } from "react";
import NavbarComponent from "./components/Navbar";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import RecipeCarousel from "./components/RecipeCarousel";
import SortDropdown from "./components/SortDropdown";
import RecipeRequestForm from "./components/RecipeRequestForm";
import { Toast, ToastContainer} from "react-bootstrap";
import './styles.css';

const RECIPES = [
  {
    title: "Mediterranean Chickpea Salad",
    description:
      "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    servings: 2,
    prep: 10,
    cook: 0,
    image: "/images/mediterranean-chickpea-salad.jpg",
  },
  {
    title: "Avocado & Tomato Wholegrain Toast",
    description:
      "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    servings: 1,
    prep: 5,
    cook: 5,
    image: "/images/avocado-tomato-toast.jpg",
  },
  {
    title: "One-Pan Lemon Garlic Salmon",
    description:
      "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    servings: 2,
    prep: 5,
    cook: 12,
    image: "/images/one-pan-lemon-garlic-salmon.jpg",
  },
  {
    title: "Quinoa Veggie Power Bowl",
    description:
      "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    servings: 2,
    prep: 10,
    cook: 15,
    image: "/images/quinoa-veggie-power-bowl.jpg",
  },
  {
    title: "Sweet Potato Black Bean Tacos",
    description:
      "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    servings: 3,
    prep: 10,
    cook: 15,
    image: "/images/sweet-potato-black-bean-tacos.jpg",
  },
  {
    title: "Greek Yogurt Berry Parfait",
    description:
      "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    servings: 1,
    prep: 5,
    cook: 0,
    image: "/images/greek-yogurt-berry-parfait.jpg",
  },
  {
    title: "Lentil & Spinach Soup",
    description: "A hearty 30-minute soup rich in plant protein and iron.",
    servings: 4,
    prep: 10,
    cook: 20,
    image: "/images/lentil-spinach-soup.jpg",
  },
  {
    title: "Banana Oat Pancakes",
    description: "Flour-free pancakes sweetened naturally with ripe bananas.",
    servings: 2,
    prep: 5,
    cook: 10,
    image: "/images/banana-oat-pancakes.jpg",
  },
];

const App = () => {
  const [filters, setFilters] = useState({
    maxPrep: Infinity,
    maxCook: Infinity,
    query: ""
  });
  const [sortBy, setSortBy] = useState("name-asc");
  const [favourites, setFavourites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleAddFavourite = (recipe) => {
    if (!favourites.find(f => f.title === recipe.title)) {
      setFavourites(prev => [...prev, recipe]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent
        favouritesCount={favourites.length}
        onShowRequestForm={() => setShowRequestForm(true)}
      />
      <Hero />
      <RecipeCarousel />
      <div className="container">
        <Filters onChange={handleFilterChange} />
        <div className="d-flex justify-content-end mb-3">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
      <RecipeGrid
        recipes={RECIPES}
        filters={filters}
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onAddFavourite={handleAddFavourite}
        favourites={favourites}
      />
      <Footer />
      <RecipeRequestForm show={showRequestForm} onClose={() => setShowRequestForm(false)} />
      <ToastContainer position="bottom-end" className="p-3 custom-toast">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide bg="success">
          <Toast.Body className="text-white">Added to favourites</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default App;
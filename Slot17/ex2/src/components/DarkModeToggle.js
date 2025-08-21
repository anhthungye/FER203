import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(CartContext);

  return (
    <Button variant="outline-light" onClick={toggleDarkMode}>
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default DarkModeToggle;

import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import '../styles/DarkModeToggle.css'; 

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Button 
      variant="outline-light" 
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default DarkModeToggle;
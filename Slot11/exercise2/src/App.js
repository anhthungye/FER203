import React, { useState } from "react";
import NavbarComponent from "./components/NavbarComponent";
import Hero from "./components/Hero";
import StudentsPage from "./components/StudentsPage";
import Footer from "./components/Footer";
import './styles.css';

function App() {
  const [quickSearch, setQuickSearch] = useState("");
  return (
    <>
      <NavbarComponent quickSearch={quickSearch} setQuickSearch={setQuickSearch} />
      <Hero />
      <StudentsPage quickSearch={quickSearch} />
      <Footer />
    </>
  );
}

export default App;

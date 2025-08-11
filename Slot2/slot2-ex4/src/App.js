import React from 'react';
import './styles.css';
import Header from './components/Header';
import ReactLogoSection from './components/ReactLogoSection';
import Navbar from './components/Navbar';
import DisplayText from './components/DisplayText';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <ReactLogoSection />
      <DisplayText />
    </div>
  );
}

export default App;
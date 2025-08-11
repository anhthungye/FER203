import React from 'react';
import logo from '../logo.svg';

const ReactLogoSection = () => {
  return (
    <section className="react-logo-section">
      <img src={logo} className="react-logo" alt="React logo" />
      <h2>This is the React logo!</h2>
      <p className="subtext">(I don't know why it's here online)</p>
      <p className="description">The library for web and native user interfaces</p>
    </section>
  );
};

export default ReactLogoSection;
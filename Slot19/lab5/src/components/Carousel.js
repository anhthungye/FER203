import React, { useState, useEffect } from 'react';
import { carouselImages } from '../data/products';
import '../styles/Carousel.css'; 

const Carousel = ({ autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        
        <button className="carousel-control prev" onClick={goToPrevious}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
      
      <div className="carousel-dots">
        {carouselImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
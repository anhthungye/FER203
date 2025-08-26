import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      alt: 'Special Offers'
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      alt: 'New Arrivals'
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      alt: 'Free Shipping'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused, slides.length]);

  return (
    <Carousel 
      activeIndex={index} 
      onSelect={handleSelect}
      indicators={false}
      prevIcon={<ChevronLeft size={32} />}
      nextIcon={<ChevronRight size={32} />}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="ecommerce-hero-carousel"
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <div 
            className="w-100 bg-dark"
            style={{ 
              height: '600px', 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
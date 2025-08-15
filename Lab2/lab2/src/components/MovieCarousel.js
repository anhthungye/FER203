import { Carousel } from 'react-bootstrap';
import { Star } from 'lucide-react';

const CarouselHero = () => {
  const slides = [
    {
      image: '/images/movie1.jpg',
      title: 'Featured Movie: Galactic Wars',
      description: 'Experience the epic space battles that will decide the fate of the galaxy!',
    },
    {
      image: '/images/movie6.jpg',
      title: 'New Release: The Time Traveler',
      description: 'A mind-bending journey through time with unexpected consequences.',
    },
    {
      image: '/images/movie8.jpg',
      title: 'Critically Acclaimed: Hidden Truth',
      description: 'Uncover the conspiracy that powerful people want to keep buried.',
    },
  ];

  return (
    <Carousel fade interval={3000} className="mb-4">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.title}
            style={{ height: '600px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-75 rounded p-3">
            <h3>
              <Star className="me-2" fill="gold" color="gold" />
              {slide.title}
            </h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselHero;
import React from "react";
import { Carousel } from "react-bootstrap";

const carouselImages = [
  { src: "/images/mediterranean-chickpea-salad.jpg", caption: "Mediterranean Chickpea Salad" },
  { src: "/images/avocado-tomato-toast.jpg", caption: "Avocado & Tomato Toast" },
  { src: "/images/one-pan-lemon-garlic-salmon.jpg", caption: "Lemon Garlic Salmon" },
];

const RecipeCarousel = () => (
  <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
    <Carousel fade interval={3500}>
      {carouselImages.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img.src}
            alt={img.caption}
            style={{ height: 550, objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3 className="bg-dark bg-opacity-50 rounded px-3 py-1 d-inline-block">{img.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default RecipeCarousel;
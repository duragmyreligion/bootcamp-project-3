// Carousel.jsx
import React from 'react';

const Carousel = () => {
  // Example array of images for the Carousel component
  const carouselImages = [
    '/images/hero1.png',
    '/images/hero2_3.png',
    // 'image3.jpg',
    // Add more images as needed
  ];
  

  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
              <img className="d-block w-100 mb-4" src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;

// import Style from "./Imagenes.module.css";


// import image5 from "./imagenes/termas-de-huife-32-scaled.jpg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// function Imagenes() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const images = [image1, image2, image3, image4, image5];
//   const imageCount = images.length;

//   const handlePrevImage = () => {
//     setCurrentImage((prevImage) => (prevImage - 1 + imageCount) % imageCount);
//   };

//   const handleNextImage = () => {
//     setCurrentImage((prevImage) => (prevImage + 1) % imageCount);
//   };

//   return (
//     <div className={Style.container}>
//       <div className={Style.slides}>
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Imagen ${index + 1}`}
//             className={`${Style.slide} ${currentImage === index ? Style.active : ""}`}
//           />
//         ))}
//       </div>
//       <div className={Style.arrowLeft} onClick={handlePrevImage}>
//         <FontAwesomeIcon icon={faArrowLeft} />
//       </div>
//       <div className={Style.arrowRight} onClick={handleNextImage}>
//         <FontAwesomeIcon icon={faArrowRight} />
//       </div>
//     </div>
//   );
// }
import React from "react";
import image from "./imagenes/termas-de-huife-32-scaled.jpg";
import image1 from "./imagenes/habitaciones-y-banxxos16.jpg";
import image2 from "./imagenes/img-1574.jpg";
import image3 from "./imagenes/img-1663-scaled.jpg";
import image4 from "./imagenes/img-1832 (1).jpg";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from "./Imagenes.module.css";


import { useState } from "react";


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className= {Style.container}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image}
          alt="First slide"
          width='100%' height='750px'
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          width='100%' height='750px'
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="First slide"
          width='100%' height='750px'
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Second slide"
          width='100%' height='750px'
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image4}
          alt="Third slide"
          width='100%' height='750px'
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default ControlledCarousel;
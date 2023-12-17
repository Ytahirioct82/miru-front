import React from "react";
import "./activity.css";
import Carousel from "react-material-ui-carousel";

const ImageSlider = ({ slides }) => {
  return (
    <Carousel>
      {slides.map((slide, i) => (
        <div key={i}>
          <img src={slide.content} alt="travel" className="image" />
        </div>
      ))}
    </Carousel>
  );
};
export default ImageSlider;

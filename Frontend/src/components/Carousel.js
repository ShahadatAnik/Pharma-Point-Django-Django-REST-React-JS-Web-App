import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import PharmaPointLogoNameWhite from "../assests/Pharma-point-logo-name-white.png";

export default function Caro() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="shadow-lg rounded-3 fw-bold text-white text-center p-2"
      style={{
        background: "#c95f5f",
      }}
    >
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={PharmaPointLogoNameWhite}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={PharmaPointLogoNameWhite}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={PharmaPointLogoNameWhite}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

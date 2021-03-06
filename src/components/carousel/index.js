import React, { useState, useEffect, useRef } from "react";
import { ToggleSwitch } from "../";
import { Chevron } from "../../assets/icons";
import { ORIENTATIONS } from "../../constants";
import "./Carousel.css";

const Carousel = ({ header, items, hasPreviews, imageOrientation }) => {
  const [presentingItemIndex, setPresentingItemIndex] = useState(0);
  const [isAutomaticView, setAutomaticView] = useState(true);
  const chevronRef = useRef();

  useEffect(() => {
    let interval;
    if (isAutomaticView) {
      interval = setInterval(() => chevronRef.current.click(), 1500);
    }
    return () => clearInterval(interval);
  }, [isAutomaticView]);

  const toggleAutomaticView = () => {
    setAutomaticView((prevState) => !prevState);
  };

  const handleNextItemClick = () => {
    if (presentingItemIndex === items.length - 1) {
      return setPresentingItemIndex(0);
    }
    setPresentingItemIndex((prevPresentingItem) => prevPresentingItem + 1);
  };

  const handlePreviousItemClick = () => {
    if (presentingItemIndex === 0) {
      return setPresentingItemIndex(items.length - 1);
    }
    setPresentingItemIndex((prevActive) => prevActive - 1);
  };

  const handleItemClick = (index) => {
    setPresentingItemIndex(index);
  };

  const handlePreviewClick = (clickedItem) => {
    const index = items.findIndex((item) => item === clickedItem);
    setPresentingItemIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__header">
        <h2 className="carousel__header--title">{header}</h2>
        <span>
          <ToggleSwitch
            leftLabel="off"
            rightLabel="on"
            checked={isAutomaticView}
            handleToggle={toggleAutomaticView}
          />
        </span>
      </div>
      <div className="carousel__content">
        {hasPreviews && (
          <div className="carousel__previews">
            <img
              src={items[presentingItemIndex - 2] || items[items.length - 2]}
              onClick={() =>
                handlePreviewClick(items[presentingItemIndex - 2] || items[items.length - 2])
              }
              alt="small view"
            />
            <img
              src={items[presentingItemIndex - 1] || items[items.length - 1]}
              onClick={() =>
                handlePreviewClick(items[presentingItemIndex - 1] || items[items.length - 1])
              }
              alt="small view"
            />
          </div>
        )}
        <div
          className={`carousel__selected ${
            imageOrientation === ORIENTATIONS.LANDSCAPE ? "carousel__selected--landscape" : ""
          }`}
        >
          <span
            className="carousel__chevron carousel__chevron-left"
            onClick={handlePreviousItemClick}
          >
            <img src={Chevron} alt="left chevron" />
          </span>
          <img src={items[presentingItemIndex]} alt="selected view" />
          <span
            className="carousel__chevron carousel__chevron-right"
            onClick={handleNextItemClick}
            ref={chevronRef}
          >
            <img src={Chevron} alt="right chevron" />
          </span>
          <span className="carousel__bar">
            {items.map((item, index) => (
              <span
                key={`carousel-item-${index * Math.random()}`}
                className={`carousel__bar-item ${
                  index <= presentingItemIndex ? "carousel__bar-item--shown" : ""
                }`}
                onClick={() => handleItemClick(index)}
              ></span>
            ))}
          </span>
        </div>
        {hasPreviews && (
          <div className="carousel__previews">
            <img
              src={items[presentingItemIndex + 1] || items[0]}
              onClick={() => handlePreviewClick(items[presentingItemIndex + 1] || items[0])}
              alt="small view"
            />
            <img
              src={items[presentingItemIndex + 2] || items[1]}
              onClick={() => handlePreviewClick(items[presentingItemIndex + 2] || items[1])}
              alt="small view"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

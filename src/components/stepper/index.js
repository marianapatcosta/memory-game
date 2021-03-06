import React, { useState } from "react";
import { Button, Step } from "..";
import { ORIENTATIONS } from "../../constants";
import "./Stepper.css";

const Stepper = ({
  className,
  stepsMetadata,
  orientation = ORIENTATIONS.LANDSCAPE,
  onSubmit,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const progressPerStep = 100 / (stepsMetadata.length - 1);

  const handleNextStepClick = () => {
    if (activeStepIndex === stepsMetadata.length - 1) return;
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex + 1);
  };

  const handlePreviousStepClick = () => {
    if (activeStepIndex === 0) return;
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex - 1);
  };

  const getProgressBarPercentage = () => activeStepIndex * progressPerStep;

  return (
    <div
      className={`stepper ${className} ${
        orientation === ORIENTATIONS.PORTRAIT ? "stepper--portrait" : ""
      }`}
    >
      <div
        className={`stepper__indicator ${
          orientation === ORIENTATIONS.PORTRAIT
            ? "stepper__indicator--portrait"
            : ""
        }`}
      >
        <div
          className={`stepper__progress-bar ${
            orientation === ORIENTATIONS.PORTRAIT
              ? "stepper__progress-bar--portrait"
              : ""
          }`}
          style={
            ORIENTATIONS.PORTRAIT
              ? { height: `${getProgressBarPercentage()}%` }
              : { width: `${getProgressBarPercentage()}%` }
          }
        />
        {stepsMetadata.map((step, index) => (
          <div
            key={`step-indicator-${index + Math.random()}`}
            className={`stepper__indicator-item ${
              index <= activeStepIndex ? "stepper__indicator-item--filled" : ""
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={`${
        orientation === ORIENTATIONS.PORTRAIT ? "stepper-container--portrait" : ""
      }`}>
        <div className={`stepper__content ${className}`}>
          {stepsMetadata.map(
            ({ renderContent }, index) =>
              index === activeStepIndex && (
                <Step
                  key={`step-${index + Math.random()}`}
                  renderContent={renderContent}
                  isActive={index === activeStepIndex}
                />
              )
          )}
        </div>
        <div className={`stepper__footer ${className}`}>
          {activeStepIndex > 0 && (
            <Button
              className="stepper__footer--left"
              label="previous"
              onClick={handlePreviousStepClick}
            />
          )}
          <Button
            className="stepper__footer--right"
            label={
              activeStepIndex === stepsMetadata.length - 1 ? "submit" : "next"
            }
            disabled={!stepsMetadata[activeStepIndex].isValid}
            onClick={
              activeStepIndex === stepsMetadata.length - 1
                ? onSubmit
                : handleNextStepClick
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Stepper;

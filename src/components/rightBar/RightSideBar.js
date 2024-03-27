import React, { useContext, useState } from "react";
import "./RightSideBar.scss"; // Styles for the RightSideBar component
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"; // Circular progress bar component
import stepnumber from "../../assets/icons/stepnumber.png"; // Image assets
import steppoints from "../../assets/icons/steppoints.png";
import steptime from "../../assets/icons/steptime.png";
import AppContext from "../../context/AppContext"; // App context for state management

const RightSideBar = ({ marginbottom }) => {
  // Access the context for state management
  const context = useContext(AppContext);
  // Destructure values from the context
  const {
    activeStepItem,
    setIsPlaying,
    isPlaying,
    totalTime,
    points,
    setActiveStepRunning,
    progress,
  } = context;

  // Function to handle starting the process
  const handleStart = () => {
    setIsPlaying(true);
  };
  // Function to handle pausing the process
  const handlePause = () => {
    setIsPlaying(false);
    setActiveStepRunning(false);
  };

  return (
    <div
      className="rightBar"
      style={{ justifyContent: marginbottom ? "center" : "space-around" }}
    >
      <div className="parent">
        <div className="progressbardiv">
          {/* Circular progress bar */}
          <CircularProgressbarWithChildren
            circleRatio={0.97}
            value={progress}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `rgb(0, 255, 34)`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          >
            <div
              style={{
                fontSize: 12,
                marginTop: -5,
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span className="state">Statistics</span>
              <span className="percent">{progress}%</span>
              <span className="progress">
                <div className="dot"></div>
                <span className="progressText">progress</span>
              </span>
            </div>
          </CircularProgressbarWithChildren>
          ;
        </div>
        <div className="parent2">
          {/* Display step number, time, and points */}
          <div className="item1">
            <span>{activeStepItem?.stepNumber} Step</span>
            <img src={stepnumber} alt="" />
          </div>
          <div className="item1">
            <span>
              {totalTime.min} min {totalTime.sec} sec
            </span>
            <img src={steptime} alt="" />
          </div>
          <div className="item1">
            <span>{points.currect * 10} points</span>
            <img src={steppoints} alt="" />
          </div>
        </div>
      </div>
      <div
        className="btnclass"
        style={{
          background: isPlaying ? "rgb(0, 255, 34)" : "white",
          alignItems: "center",
          justifyContent: isPlaying ? "flex-end" : "flex-start",
          marginBottom: marginbottom ? "150px" : "0px",
        }}
      >
        {/* Play and Pause buttons */}
        {!isPlaying && (
          <button
            style={{ background: "rgb(0, 255, 34)" }}
            onClick={handleStart}
          >
            Play
          </button>
        )}
        {isPlaying && <button onClick={handlePause}>Pause</button>}
      </div>
    </div>
  );
};

export default RightSideBar;

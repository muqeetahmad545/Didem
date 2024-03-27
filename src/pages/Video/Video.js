import React, { useEffect } from "react";
import "./Video.scss";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

const Video = () => {
  // Initialize React Router's navigate function
  const navigate = useNavigate();
  
  // Define a function to handle video end
  const handleVideoEnd = () => {
    navigate("/home", {state:{welcome:true}});
  };

  return (
    <div className="video">
      <div className="reactangle">
        <div className="spipbutton">
          {/* Button to navigate to the home page */}
          <button onClick={() => navigate("/home", {state:{welcome:true}})}>Go To Home</button>
        </div>

        {/* ReactPlayer component to display a YouTube video */}
        <ReactPlayer
          url="https://www.youtube.com/watch?v=1RkseDeYS9g"
          playing={true}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  );
};

export default Video;

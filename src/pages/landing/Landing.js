import React, { useEffect } from "react";
import "./Landing.scss";

import landing1 from "../../assets/images/landingBrain.gif";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const Landing = () => {
  // Initialize React Router's navigate function
  const navigate = useNavigate();

  // Check for stored user data in local storage and navigate to the home page if found
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="landing">
      <div className="borderdiv">
        <div className="item1"></div>
        <div className="item1"></div>
      </div>
      <div className="rightDiv">
        <div className="videoPlayer">
          <ReactPlayer
            url="https://vimeo.com/866048149?share=copy"
            loop={true}
            playing={true}
            width="100%"
            height="100%"
          />
        </div>
        <span className="title" onClick={() => navigate("/welcome")}>
          Next-Gen Neurosurgical Training
        </span>
      </div>
    </div>
  );
};

export default Landing;

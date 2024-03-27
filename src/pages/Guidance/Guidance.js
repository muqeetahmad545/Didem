import React from "react";
import "./Guidance.scss";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/images/4403856.png";
import img2 from "../../assets/images/5250860.png";

const Guidance = () => {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  return (
    <div className="guidance">
      <div className="reactangle">
        <span className="Choose_Your_Professor">Choose Your Professor</span>
        <span className="Choose_Your_Professor_Text">
          By choosing a professor, you will be guided by them throughout the
          game.
        </span>

        <div className="drdiv">
          <div className="drparent">
            <div className="img" onClick={() => navigate("/video")}>
              <img src={img1} alt="" />
            </div>
            <div className="doctorname2">Prof. Dr. Cortex</div>
          </div>
          <div className="drparent">
            <div className="img" onClick={() => navigate("/video")}>
              <img src={img2} alt="" />
            </div>
            <div className="doctorname2">Prof. Dr. NeuroXcel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidance;

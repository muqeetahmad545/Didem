import React, { useContext, useState } from "react";
import CaseLeft from "../case left bar/CaseLeft";
import "./PatientPositioning.scss";
import gif from "../../../assets/images/gifimg.jpg";
import AppContext from "../../../context/AppContext";
import { Checkbox } from "antd";
import { Button, Space } from "antd";

import { useNavigate } from "react-router-dom";
const PatientPositioning = () => {
  // Access context data using the useContext hook
  const context = useContext(AppContext);
  // Destructure properties from the context
  const {
    setActiveTab,
    setActiveStep,
    stepsArray2,
    setStepsArray2,
    presentationButtonActive,
    setPresentationButtonActive,
    resetStates,
    progress,
  } = context;

  // State variables for GIF list and preview
  const [gifList, setGifList] = useState([
    {
      gif: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Cerebral_hemisphere_-_animation.gif',
      title: "Right Anterior Inter-hemespheric approach",
      position: "Head Rotation : 0\u00B0",
    },
    {
      gif: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Parietal_lobe_animation.gif',
      title: "Left Pterional",
      position: "Head Rotation : 15\u00B0 Right",
    },
    {
      gif:'https://upload.wikimedia.org/wikipedia/commons/3/3d/Cerebrum_-_temporal_lobe_-_inferior_view_animation.gif',
      title: "Left Temporobasal",
      position: "Head Rotation : 60\u00B0 Right",
    },
    {
      gif: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Left_temporal_bone_close-up_inferior_animation.gif',
      title: "RLeft Extended Retrosigmoid",
      position: "Head Rotation : 90\u00B0 Right",
    },
    {
      gif: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Medial_pterygoid_muscle_animation.gif',
      title: "Right Pterional",
      position: "Head Rotation : 15\u00B0 Left",
    },
    {
      gif: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Parietal_lobe_-_animation.gif',
      title: "Right Temporobasal",
      position: "Head Rotation : 60\u00B0 Left",
    },
    {
      gif: 'https://assets.coursehero.com/study-guides/lumen/images/boundless-psychology/structure-and-function-of-the-brain/kv7jtzsurlmcxjxtwh0k13.gif',
      title: "Right Modified Anterior Inter-hemespheric approach",
      position: "Head Rotation : 90\u00B0 Left",
    },
    {
      gif: 'https://dm27uw8wcv0cc.cloudfront.net/Assets/image/gif/5d8f5112-848a-4e5f-af80-1ac653e7993a.gif',
      title: "Right Extended Retrosigmoid",
      position: "Head Rotation : 90\u00B0 Left",
    },
  ]);
  const [preView, setPreView] = useState(false);

  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedGifIndex, setSelectedGifIndex] = useState(null);

  const navigate = useNavigate();
  // Style for text and font size in the preview
  const style = {
    fontSize: preView ? "12px" : "18px",
    fontWeight: preView ? "900" : "400",
  };
  // Handle click on a GIF item to display it in the preview
  const handleGifClick = (gifImage, indx) => {
    setPreView(true);
    setSelectedGif(gifImage);
    setSelectedGifIndex(indx);
  };
  const handleNextButton = () => {
    setActiveTab("home");
    resetStates();

    // const updatedArray = [...stepsArray2]; // Create a copy of the array
    // updatedArray[0].isActive = true; // Update the isInProcess property
    // setStepsArray2(updatedArray);
    setStepsArray2(
      stepsArray2.map((step) => ({
        ...step,
        isStepCompleted: false,
        isInProcess: false,
        isActive: true,
        timeSpent: { min: 0, sec: 0 },
        stepQuestionsList: step.stepQuestionsList.map((question) => ({
          ...question,
          userAnswer: "",
        })),
      }))
    );
    setPresentationButtonActive(false);
    // if(progress>=100){
    // alert('You already have done this')

    // }else{
    navigate("/home");

    // }
  };

  return (
    <div className="PatientPositioning">
      <div className="leftbar">
        <CaseLeft case={3} />
      </div>

      <div
        style={{ width: preView ? "40%" : "74%" }}
        className="evaluationbody"
      >
        <div className="toptext">
          <div className="textdiv">
            <span>Patient Positioning</span>
          </div>
        </div>

        <div className="evaluationcontentbody">
          <div className="imgParent">
            {gifList.map((item, index) => {
              return (
                <div
                  style={{
                    background:
                      selectedGifIndex === index ? "rgb(79, 105, 79)" : "none",
                  }}
                  className="item"
                  onClick={() => handleGifClick(item, index)}
                >
                  <img src={item.gif} alt="" />
                 
                  <span style={style}>{item?.title}</span>

                  <span className="imgpositionTeext">{item?.position}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ width: preView ? "50%" : "17%" }} className="rightbar">
        {preView ? (
          // Display the selected GIF in a previewer
          <div className="previewer">
            <img src={selectedGif.gif} alt="gif" />
            <span className="imgpositionText">{selectedGif?.position}</span>

            <span className="imgpositionText2">Neurosurgical Atlas USA</span>

            <button className="proceedbutton" onClick={() => setPreView(false)}>
              Proceed
            </button>
          </div>
        ) : (
          // Display the right-side text information
          <div className="rightSideText">
            <span className="headingtxt">Patient Positioning</span>
            <div className="bodytxt">
              <span>1- Pation Evaluation </span>

              <span>2- Radiological Examination </span>
              <span>3- Pation positioning </span>
            </div>

            <span className="headingtxt" style={{ color: "rgb(0, 255, 34)" }}>
              Completed
            </span>
          </div>
        )}
      </div>
      {!preView && (
        // Display the "Next" button to proceed to the next steps
        <div className="nextbtndiv" onClick={() => handleNextButton()}>
          <span className="nextbtn">Next</span>

          <div className="arror">
            {" "}
            <span> &gt; </span>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPositioning;

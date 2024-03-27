import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { FolderOutlined } from "@ant-design/icons";
import WelcomeText from "../../components/welcomeText/WelcomeText";
import RightSideBar from "../../components/rightBar/RightSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionComp from "../../components/question comp/QuestionComp";
import AppContext from "../../context/AppContext";
import completed from "../../assets/icons/completed.png";

import { AiOutlineBulb } from "react-icons/ai";

const HomePage = () => {
  // Get context from AppContext
  const context = useContext(AppContext);
  const [showMessage, setShowMessage] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [stepIndex, setStepIndex]= useState(0)
  const location = useLocation();
  const { state } = location;
  let welcome;
  if (state !== null) {
    welcome = state.welcome;
  }

  // Destructuring values from context
  const {
    setActiveTab, // Function to set the active tab
    activeStepItem, // Current active step
    setActiveStepItem, // Function to set the active step
    stepsArray2, // Array of steps for the presentation
    setStepsArray2, // Function to set stepsArray2
    setActiveStepRunning, // Function to set if an active step is running
    presentationButtonActive, // Boolean to determine if the presentation button is active
    setPresentationButtonActive, // Function to set the presentation button's activity
    setIsPlaying, // Function to set if a video is playing
    progress
  } = context;
  useEffect(() => {
    const fetchMessage=async()=>{
      const storageDate = localStorage.getItem("user");
      const convertToJSON = JSON.parse(storageDate);
      console.log('active',activeStepItem)
      setUserName(convertToJSON.UserName);
      if (welcome) {
        await delay(3000)
        await newMessageShow(
          `Welcome again ${userName}! I will be guiding you on the Next-Gen Training steps.`,
          3500
        );
       await newMessageShow(
          'You are going to start with the case presentation to know about the patient history, then the 6 other below steps will unlock for the hands-on training.',
          7000
        );
        await newMessageShow('Feel free to start once you are ready.', 3500);
      
      }else if(stepsArray2[0].isActive){
        await delay(2000)
        await newMessageShow('By clicking the Step 1: Tumor Localization and Assessment, your dual training will start. Make sure you complete the multiple choice questions before you start hands-on training.', 10000)
      }
    }
   fetchMessage()
  }, []);
  const newMessageShow = async (message, delayTime) => {
    setMessage(message);
    setShowMessage(true);
    await delay(delayTime);
    setShowMessage(false);
  };

  const delay= (time)=> new Promise((resolve)=> setTimeout(resolve,time))
  useEffect(() => {}, [message]);

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home2">
        <div className="topSide">
          <div className="leftdiv">
            <span className="texto">Simulator Connected</span>
            <span className="dot"></span>
          </div>
        </div>
        {/* Check if an active step is set, if not, display the presentation content */}

        {!activeStepItem ? (
          <div className="leftSide">
            <div className="presentation">
              <div className="presentationtxt">
                {showMessage && <WelcomeText message={message} />}
                {/* <WelcomeText message={'Hello to every One'}/> */}
              </div>
              <div className="files">
                <div
                  style={{
                    border: presentationButtonActive
                      ? "1px solid #88bbef"
                      : "1px solid  #233342",
                  }}
                  className="rerectangle"
                  onClick={() => {
                    navigate("/casePreparation/patientEvaluation", {state:{welcome}});
                    setActiveTab("case");
                    setPresentationButtonActive(true);
                  }}
                >
                  <FolderOutlined />
                  <span> Case Presentation</span>
                </div>
                <div className="content">
                  {/* List of presentation steps */}
                  {stepsArray2.map((item, index) => {
                    return (
                      <div
                        style={{
                          border: index===0? item?.isActive
                          ? "1.02413px solid #88bbef"
                          : null: null,
                          cursor: index===0? item?.isActive ? "pointer" : "default":"default",
                        }}
                        className="item"
                        onClick={() => {
                          if (index===0 && item?.isActive) {
                            setActiveStepRunning(true);
                            setActiveStepItem(item);
                            const updatedArray = [...stepsArray2];
                            updatedArray[index].isInProcess = true;
                            setStepsArray2(updatedArray);
                            setIsPlaying(true);
                          }
                        }}
                      >
                        <span
                          style={{
                            color: index===0? item?.isActive ? "white" : "#515151": "#515151",
                          }}
                          className="number"
                        >
                          {item.stepNumber}
                        </span>
                        <span
                          style={{
                            color: index===0? item?.isActive ? "white" : "#515151": "#515151",
                            fontSize: "20px",
                          }}
                          className="stepText"
                        >
                          {" "}
                          {item.stepText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="parentQuestion">
            <div className="questioncomponent">
              <QuestionComp />
            </div>
            <div className="hrr">
              <div className="horizontalline"></div>
            </div>
            <div className="stepsList">
              {/* List of steps with optional checkmark icon and time spent */}

              {stepsArray2.map((item, index) => {
               
                return (
                  <div
                    style={{
                      border: index===0? item?.isActive ? "1.02413px solid #88bbef" : null: null,
                      cursor: index===0? stepIndex?.isActive ? "pointer" : "default":"default",
                    }}
                    className="item"
                    onClick={() => {
                      if (index===0&&item?.isActive) {
                        setActiveStepRunning(true);
                        setActiveStepItem(item);

                        const updatedArray = [...stepsArray2]; // Create a copy of the array
                        updatedArray[index].isInProcess = true;
                        // Update the isInProcess property
                        setStepsArray2(updatedArray);
                      }
                    }}
                  >
                    {item.isStepCompleted && (
                      <img className="imagestyle" src={completed} alt="" />
                    )}
                    
                  
                    
                    <span>{item.stepNumber}</span>
                    <span
                      style={{
                        fontSize: "small",

                      }}
                    >
                      {" "}
                      {item.stepText}
                    </span>
                    {item.timeSpent.min ||
                      (item.timeSpent.sec && (
                        <span className="time">
                          min:{item.timeSpent.min} sec:{item.timeSpent.sec}
                        </span>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="rightSide">
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePage;

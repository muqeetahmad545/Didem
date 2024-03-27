import React, { useContext, useEffect, useState } from "react";
import "./QuestionComp.scss";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineBulb } from "react-icons/ai";
import WelcomeText from "../welcomeText/WelcomeText";

const QuestionComp = () => {
  const context = useContext(AppContext); // Access the context for state management
  const navigate = useNavigate(); // Initialize a navigation function

  // Destructure values from the context
  const {
    activeStepItem,
    setActiveTab,
    setActiveStepItem,
    stepsArray2,
    setStepsArray2,
    activeStepTime,
    setActiveStepTime,
    points,
    setPointsUpdate,
    setActiveStepRunning,
    progress,
    setProgress,
    setIsPlaying,
  } = context;

  // Define local state variables
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionsLenght, setquestionsLenght] = useState(null);
  const [remarksTab, setRemarksTab] = useState(false);
  const [congratesTab, setCongratesTab] = useState(false);
  const [blubToggel, setBlubToggel] = useState(false);
  const [userData, setUserData] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [blinkCorrectAnswer, setBlinkCorrectAnswer] = useState(false);
  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      // If data exists in local storage, parse it and set it to the state
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    // Initialize question and remarks tabs based on the active step item

    if (activeStepItem?.stepQuestionsList?.length) {
      console.log(activeStepItem)
      setquestionsLenght(activeStepItem?.stepQuestionsList.length - 1);
      setRemarks(activeStepItem?.remarks);
      setActiveQuestion(activeStepItem?.stepQuestionsList[0]);
      setRemarksTab(false);
    } else {
      setRemarksTab(true);
    }
  }, [activeStepItem]);

  const handleNextClick = () => {
    setBlubToggel(false);

    handleAnswerSubmit();

    const currentQuestionIndex =
      activeStepItem.stepQuestionsList.indexOf(activeQuestion);

    if (currentQuestionIndex < questionsLenght) {
      setActiveQuestion(
        activeStepItem?.stepQuestionsList[currentQuestionIndex + 1]
      );
    } else {
      setActiveQuestion(null);
      setRemarksTab(true);
    }
  };
  // Handle the "Next" button click for questions
  const handleRemarkNextClick = () => {
    const currentQuestionIndex = stepsArray2.indexOf(activeStepItem);

    if (currentQuestionIndex < stepsArray2?.length - 1) {
      // Go to the next step
      const updatedArray = [...stepsArray2]; // Create a copy of the array
      updatedArray[currentQuestionIndex].isInProcess = false;
      setActiveStepRunning(false);
      updatedArray[currentQuestionIndex].timeSpent = activeStepTime;
      setActiveStepTime({ min: 0, sec: 0 });
      updatedArray[currentQuestionIndex].isStepCompleted = true;
      setProgress((prev) => prev + 16);
      updatedArray[currentQuestionIndex].isActive = false;

      updatedArray[currentQuestionIndex + 1].isInProcess = true;
      setActiveStepRunning(true);

      updatedArray[currentQuestionIndex + 1].isStepCompleted = false;
      updatedArray[currentQuestionIndex + 1].isActive = true;
      setStepsArray2(updatedArray);
      
      setActiveStepItem(updatedArray[currentQuestionIndex + 1]);

      setRemarksTab(false);
    } else {
      // All steps completed, show congratulations tab
      const updatedArray = [...stepsArray2]; // Create a copy of the array
      updatedArray[currentQuestionIndex].isInProcess = false;
      updatedArray[currentQuestionIndex].isStepCompleted = true;
      setProgress((prev) => prev + 20);

      updatedArray[currentQuestionIndex].isActive = false;
      setActiveStepRunning(true);

      updatedArray[currentQuestionIndex].timeSpent = activeStepTime;

      setStepsArray2(updatedArray);
      setRemarksTab(false);
      setIsPlaying(false);
      setCongratesTab(true);
    }
  };
  // Handle the "Close" button click for the congratulations tab
  const handleClose = () => {
    navigate("/dashboard", { state: { training: true } });
    setActiveTab("score");
    const updatedArray = [...stepsArray2]; // Create a copy of the array
    updatedArray[activeStepItem.stepNumber - 1].isActive = false; // Update the isInProcess property
    setStepsArray2(updatedArray);
    setActiveStepItem(null);
    setActiveQuestion(null);
  };

  // Handle selecting an answer for a question
  // const handleAnswer = (selectedAnswer) => {
  //   const currentStepIndex = stepsArray2.indexOf(activeStepItem);
  //   const currentQuestionIndexx =
  //     activeStepItem.stepQuestionsList.indexOf(activeQuestion);
  //   const updatedArray = [...stepsArray2]; // Create a copy of the array

  //   updatedArray[currentStepIndex].stepQuestionsList[
  //     currentQuestionIndexx
  //   ].userAnswer = selectedAnswer;

  //   setStepsArray2(updatedArray);
  //   if (activeQuestion.userAnswer) {
  //     setBlubToggel(true);
  //     activeQuestion.userAnswer === activeQuestion.answer
  //       ? setPointsUpdate({ currect: points.currect + 1 })
  //       : setPointsUpdate({ wrong: points.wrong + 1 });
  //   } else {
  //     setBlubToggel(false);
  //   }
  // };

  
  const handleAnswer = (selectedAnswer) => {
    const currentStepIndex = stepsArray2.indexOf(activeStepItem);
    const currentQuestionIndexx =
      activeStepItem.stepQuestionsList.indexOf(activeQuestion);
    const updatedArray = [...stepsArray2]; // Create a copy of the array

    updatedArray[currentStepIndex].stepQuestionsList[
      currentQuestionIndexx
    ].userAnswer = selectedAnswer;

    setStepsArray2(updatedArray);
    if (activeQuestion.userAnswer) {
      setBlubToggel(true);
      if (activeQuestion.userAnswer === activeQuestion.answer) {
        setPointsUpdate({ currect: points.currect + 1 });
      } else {
        setPointsUpdate({ wrong: points.wrong + 1 });
        setBlinkCorrectAnswer(true); // Trigger blinking animation for the correct answer
        setTimeout(() => {
          setBlinkCorrectAnswer(false); // Turn off blinking animation after 2 seconds
        }, 2000);
      }
    } else {
      setBlubToggel(false);
    }
  };
  
  
  // Handle submitting the user's answer
  const handleAnswerSubmit = () => {
    let user_id = userData.id;
    let question = activeQuestion.question;
    let user_answer = activeQuestion.userAnswer;
    let is_true = activeQuestion.userAnswer === activeQuestion.answer ? 1 : 0;

    const answerObj = {
      user_id: user_id,
      question: question,
      user_answer: user_answer,
      is_true: is_true,
    };
    fetch("http://0.0.0.0:18080/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerObj),
    })
      .then((response) => {
        if (response.status === 201) {
        } else {
          throw new Error("Failed to submit user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const getBorderStyle = (index) => {
  //   if (activeQuestion.userAnswer === activeQuestion.options[index]) {
  //     return {
  //       border:
  //         activeQuestion.userAnswer === activeQuestion.answer
  //           ? "1.02413px solid rgb(0, 255, 34)"
  //           : "1.02413px solid red",
  //       color:
  //         activeQuestion.userAnswer === activeQuestion.answer
  //           ? "rgb(0, 255, 34)"
  //           : "red",
  //       fontWeight: "400",
  //       fontSize: "20px",
  //     };
  //   } else {
  //     return {
  //       border: "none",
  //       fontWeight: "400",
  //       fontSize: "20px",
  //       color: "white",
  //     };
  //   }
  // };


  // const getBorderStyle = (index) => {
  //   if (activeQuestion.userAnswer === activeQuestion.options[index]) {
  //     // User selected this option
  //     if (activeQuestion.userAnswer === activeQuestion.answer) {
  //       // User selected the correct answer
  //       return {
  //         border: "1.02413px solid rgb(0, 255, 34)",// No border for correct answer selected by user
  //         fontWeight: "400",
  //         fontSize: "20px",
  //         color: "white",
  //       };
  //     } else {
  //       // User selected a wrong answer
  //       return {
  //         border: "1.02413px solid red", // Red border for wrong answer selected by user
  //         color: "red", // Red color for wrong answer
  //         fontWeight: "400",
  //         fontSize: "20px",
  //       };
  //     }
  //   } else if (activeQuestion.userAnswer !== "" && activeQuestion.options[index] === activeQuestion.answer) {
  //     // This option is the correct answer and user hasn't selected it yet
  //     return {
  //       border: "1.02413px solid rgb(0, 255, 34)", // Green border for correct answer
  //       color: "rgb(0, 255, 34)", // Green color for correct answer
  //       fontWeight: "400",
  //       fontSize: "20px",
  //     };
  //   } else {
  //     // Neither selected answer nor correct answer
  //     return {
  //       border: "none",
  //       fontWeight: "400",
  //       fontSize: "20px",
  //       color: "white",
  //     };
  //   }
  // };
  
  
  const getBorderStyle = (index) => {
    if (activeQuestion.userAnswer === activeQuestion.options[index]) {
      // User selected this option
      if (activeQuestion.userAnswer === activeQuestion.answer) {
        // User selected the correct answer
        return {
          border: "1.02413px solid rgb(0, 255, 34)",
          fontWeight: "400",
          fontSize: "20px",
          color: "white",
        };
      } else {
        // User selected a wrong answer
        return {
          border: "1.02413px solid red",
          color: "red",
          fontWeight: "400",
          fontSize: "20px",
        };
      }
    } else if (
      activeQuestion.userAnswer !== "" &&
      activeQuestion.options[index] === activeQuestion.answer
    ) {
      // This option is the correct answer and user hasn't selected it yet
      return {
        border: blinkCorrectAnswer ? "1.02413px solid rgb(0, 255, 34)" : "none",
        color: blinkCorrectAnswer ? "rgb(0, 255, 34)" : "white",
        fontWeight: "400",
        fontSize: "20px",
      };
    } else {
      // Neither selected answer nor correct answer
      return {
        border: "none",
        fontWeight: "400",
        fontSize: "20px",
        color: "white",
      };
    }
  };
  
  
  return (
    <div className="qparent">
      <div className="outerTextdiv">
        <span>{remarksTab ? null : activeStepItem.outerText}</span>
      </div>
      {activeQuestion && (
        <div className="innerTextdiv">
          <div className="qbox">
            <div className="div0">
              {blubToggel ? (
                <AiOutlineBulb
                  style={{
                    padding: "5px",
                    color: activeQuestion.userAnswer
                      ? activeQuestion.userAnswer === activeQuestion.answer
                        ? "rgb(0, 255, 34)"
                        : "red"
                      : "white",
                    animation: "colorChange 1s ease-in-out infinite",
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="div1">
              <span className="headingtxt">{activeStepItem.stepText}</span>
              <span className="headingtxt">
                Question{" "}
                {activeStepItem?.stepQuestionsList?.indexOf(activeQuestion) + 1}
              </span>
            </div>
            <div className="div2">
              <span className="bodytxt">{activeQuestion.question}</span>
            </div>
            <div
              className="div3"
              style={{
                pointerEvents: activeQuestion.userAnswer ? "none" : "auto",
              }}
            >
              <div
                className="answer"
                style={getBorderStyle(0)}
                onClick={() => handleAnswer(activeQuestion.options[0])}
              >
                (A) {activeQuestion.options[0]}
              </div>
              <div
                className="answer"
                style={getBorderStyle(1)}
                onClick={() => handleAnswer(activeQuestion.options[1])}
              >
                (B) {activeQuestion.options[1]}
              </div>
              <div
                className="answer"
                style={getBorderStyle(2)}
                onClick={() => handleAnswer(activeQuestion.options[2])}
              >
                (C) {activeQuestion.options[2]}
              </div>
              <div
                className="answer"
                style={getBorderStyle(3)}
                onClick={() => handleAnswer(activeQuestion.options[3])}
              >
                (D) {activeQuestion.options[3]}
              </div>
            </div>

            <div className="nextQuestionButton">
              {" "}
              <button onClick={handleNextClick}>next</button>
            </div>
          </div>
        </div>
      )}

      {remarksTab && (
        <div className="innerTextdiv">
          <div className="qbox">
            <div className="div1">
              <span className="headingtxt">
                Remarks: {activeStepItem.stepText}
              </span>
            </div>
            <ul className="div2">
              {remarks.length > 0 ? (
                remarks.map((remarks) => {
                  return <li className="bodytxt">{remarks}</li>;
                })
              ) : (
                <></>
              )}
            </ul>
            {/* <div className="div3"></div> */}

            <div className="nextQuestionButton">
              {" "}
              <span className="finishBtn" onClick={handleRemarkNextClick}>
                {activeStepItem.stepNumber === 6 ? (
                  <span className="">Finish Training</span>
                ) : (
                  <span className="">
                    Finish Step {activeStepItem.stepNumber}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {congratesTab && (
        <div className="innerTextdiv" >
          <div className="welcomeText">
            <WelcomeText message={`Congratulations ${userData.UserName}`} />
          </div>
          <div
            className="qbox"
            style={{
              justifyContent: "center",
            }}
          >
            <div className="div1">
              <span className="headingtxt">
                Congratulation {userData.UserName}
              </span>
            </div>
            <div className="div2">
              <span className="bodytxt">
                Successfully completing your Next-Gen dual training in
                neurosurgeon is remarkable actievement. You've conquered the
                dual Next-Gen training!
              </span>
              <span className="bodytxt">
                Following the Next-Gen Traning and mastering the Simulator,
                you've elevated neurosurgery to new levels. Click the "Next"
                button to see your performance throughout the training.
              </span>
            </div>
            {/* <div className="div2">
            </div> */}

            <div className="btn">
              {" "}
              <button className="btn" onClick={handleClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionComp;

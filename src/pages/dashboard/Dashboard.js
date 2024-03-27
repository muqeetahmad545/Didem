import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.scss";
import { FilterOutlined } from "@ant-design/icons";
import { Avatar, Divider, Space, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import RightSideBar from "../../components/rightBar/RightSideBar";
import AppContext from "../../context/AppContext";

import icon from "../../../src/assets/icons/Icon.png";

import completed from "../../assets/icons/completed.png";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useLocation } from "react-router-dom";
import WelcomeText from "../../components/welcomeText/WelcomeText";

const Dashboard = () => {
  // States to store total seconds, user answers, and the percentage of correct answers

  const [totalSeconds, setTotalSeconds] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [performance, setPerformance] = useState("");

  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const state = location;
  let training;
  if (state.state !== null) {
    training = state.state;
  }
  useEffect(() => {
    const fetchMessage = async () => {
      if (training) {
        await delay(2000);
        await newMessageShow(
          "Her is your performance data provided on the Next-Gen neurosurgical training.",
          9000
        );
        await delay(33000);
        await newMessageShow(
          "Feel free to log-off using the icon located in the top-left corner oft he screen. Our staff will be available inperson to guide you through the next steps.",
          9000
        );
      }
    };
    fetchMessage();
  }, []);

  const newMessageShow = async (message, time) => {
    setMessage(message);
    setShowMessage(true);
    await delay(time);
    setShowMessage(false);
  };

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const context = useContext(AppContext);

  // Destructuring context values
  const {
    setActiveTab,
    activeStepItem,
    setActiveStepItem,
    stepsArray2,
    setStepsArray2,
    setActiveStepRunning,
    presentationButtonActive,
    setPresentationButtonActive,
    points,
    totalTime,
  } = context;
  const [surgeonName, setSergeonName] = useState("");

  // useEffect to fetch user answers and calculate percentage

  useEffect(() => {
    let seconds = 0;

    if (totalTime.min) {
      seconds = totalTime.min * 60;
    }
    if (totalTime.sec) {
      setTotalSeconds(seconds + totalTime.sec);
    }
    const storedUserData = localStorage.getItem("user");
    const user = JSON.parse(storedUserData);
    setSergeonName(user.SurName);
    if (storedUserData) {
      fetch(`http://0.0.0.0:18080/answer/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserAnswers(data); // Set the user answers in state

          let totalLength = data?.length;
          console.log(data);
          const trueAnswers = data.filter((item) => item.is_true);
          // trueAnswers?.length > 25
          //   ? setPerformance("High Performance")
          //   : trueAnswers?.length <= 25 && trueAnswers?.length > 20
          //   ? setPerformance("Well Performance")
          //   : trueAnswers?.length <= 20 && trueAnswers?.length > 10
          //   ? setPerformance("Moderate Performance")
          //   : trueAnswers?.length <= 10
          //   ? setPerformance("Low Performance")
          //   : setPerformance("");

          // if (trueAnswers?.length > 25) {
          //   setPerformance("High Performance");
          // } else if (trueAnswers?.length <= 25 && trueAnswers?.length > 20) {
          //   setPerformance("Well Performance");
          // } else if (trueAnswers?.length <= 20 && trueAnswers?.length > 10) {
          //   setPerformance("Moderate Performance");
          // } else if (trueAnswers?.length <= 10) {
          //   setPerformance("");
          // }
          // setPercentage(Math.floor((trueAnswers?.length / totalLength) * 100));
        })
        .catch((error) => {
          console.error("Error fetching user answers:", error);
        });
      const totalQuestionAttempt = points.currect + points.wrong;
      points.currect > 25
        ? setPerformance("High Performance")
        : points.currect <= 25 && points.currect > 20
        ? setPerformance("Well Performance")
        : points.currect <= 20 && points.currect > 10
        ? setPerformance("Moderate Performance")
        : points.currect <= 10 && totalQuestionAttempt !== 0
        ? setPerformance("Low Performance")
        : setPerformance("Performance");

      setPercentage(Math.floor((points.currect / 30) * 100));
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="completedparent">
        {/* <div className="topSide">
          <div className="leftdiv">
            <span className="texto">/span>
          </div>
        </div> */}
        <div className="div1">
          <div className="div1child">{
          surgeonName.charAt(0).toUpperCase()+surgeonName.slice(1)
          }</div>
          <div className="div1child">T103_MR_T1</div>
          <div className="div1child">Grade of challenge:10</div>
          <div className="div1child">No rapture</div>
        </div>

        <div className="stepsList">
          {stepsArray2.map((item, index) => {
            return (
              <div
                className="item"
                onClick={() => {
                  if (item?.isActive) {
                    setActiveStepRunning(true);

                    setActiveStepItem(item);

                    const updatedArray = [...stepsArray2]; // Create a copy of the array
                    updatedArray[index].isInProcess = true;
                    // Update the isInProcess property
                    setStepsArray2(updatedArray);
                  }
                }}
              >
                {item.isStepCompleted ? (
                  <img className="imagestyle" src={completed} alt="" />
                ) : (
                  <img
                    className="imagestyle"
                    src={completed}
                    alt=""
                  />
                )}
                <span>{item.stepNumber}</span>
                <span> {item.stepText}</span>
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

        <div className="performance">
          <div className="performancediv">
            <div className="textDiv">
              <span className="heading">Performance</span>
              <span className="bodyy">Statistic based on scoreboard</span>
            </div>

            <div className="progressdiv">
              <div className="progressbardiv">
                <CircularProgressbarWithChildren
                  circleRatio={0.6}
                  value={percentage}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.7,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(62, 152, 199, 100)`,
                    textColor: "#f88",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      alignItems: "center",
                    }}
                  >
                    <img style={{ width: 40 }} src={icon} alt="doge" />
                    <span className="percent">{percentage}%</span>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className="staticsdiv">
              <span>0%</span>
              <div className="percentshow">
                <span>{performance}</span>
              </div>
              <span>100%</span>
            </div>
          </div>
          <div className="stepsdiv">
            <div className="timeheading">
              <span className="heading">Steps</span>
              <span className="heading heading1">Time Spent</span>
            </div>

            {stepsArray2.map((item, index) => {
              let spendedSeconds = 0;
              let percent = 0;

              if (item.timeSpent.min) {
                spendedSeconds = item.timeSpent.min * 60;
              }
              if (item.timeSpent.sec) {
                spendedSeconds += item.timeSpent.sec;
              }

              if (spendedSeconds && totalSeconds) {
                percent = Math.floor((spendedSeconds / totalSeconds) * 100);
              }

              return (
                <div className="timeBody">
                  <span>{item.stepText}</span>
                  <div
                    className="bar"
                    style={{
                      width: 170,
                      right: 50,
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontSize: "x-small",
                      }}
                    >{`${item.timeSpent.min} m / ${item.timeSpent.sec} s`}</div>
                    <div
                      style={{
                        position: "absolute",
                        width: "25%",
                      }}
                    >
                      <Progress
                        percent={percent}
                        format={() => `done`}
                        size="small"
                        showInfo={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="scorboard">
          <div className="bottomdiv" onClick={()=>window.location.href= 'https://ant.design/'}>
            <div className="scorbrd">
              <FilterOutlined />
              <span>Scoreboard</span>
            </div>
            <div className="icons">
              <Avatar.Group>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <a href="https://ant.design">
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                </a>
                <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{ backgroundColor: "#1677ff" }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>
            </div>
            <div className="date">
              <span>Data</span>
            </div>
            <div className="progress">
              <Progress percent={30} size="small" />
            </div>
          </div>
        </div>
        {showMessage && (
          <div className="message">
            <WelcomeText message={message} />
          </div>
        )}
      </div>

      <div className="rightside">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Dashboard;

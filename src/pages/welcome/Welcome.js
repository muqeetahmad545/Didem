import React, { useEffect, useState } from "react";
import "./Welcome.scss";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  // Initialize React Router's navigate function
  const navigate = useNavigate();

  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);

  const [sixth, setsixth] = useState(false);
  const [seventh, setseventh] = useState(false);
  const [eighth, seteighth] = useState(false);

  // Use useEffect to control the timing of animations
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFirst(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setSecond(true);
    }, 3000);

    const timer3 = setTimeout(() => {
      setThird(true);
    }, 4000);

    const timer4 = setTimeout(() => {
      setFourth(true);
    }, 5000);

    const timer5 = setTimeout(() => {
      setFifth(true);
    }, 6000);

    const timer6 = setTimeout(() => {
      setsixth(true);
    }, 7000);

    const timer7 = setTimeout(() => {
      setseventh(true);
    }, 8000);

    const timer8 = setTimeout(() => {
      seteighth(true);
    }, 1000);

    return () => {
      // (Repeat for timer2 to timer8)
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);

      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
    };
  }, []);
  return (
    <div className="welcome">
      <div className="borderdiv">
        <div className="item1"></div>
        <div className="item1"></div>
      </div>

      <div className="content">
        <span className={`Welcomeheading fadeIn  ${eighth ? "visible" : ""}`}>
          Welcome!
        </span>
        <div className="contentbody">
          <div className={`welcomBody fadeIn  ${first ? "visible" : ""}`}>
            Welcome to the Next-Gen Neurosurgical Training. You are about to
            embark on a serious game designed to help you improve your surgical
            skills and knowledge through a hybrid training approach.
          </div>
          <div
            className={`Through_out_the_Game fadeIn  ${
              second ? "visible" : ""
            }`}
          >
            Throughout the Game
          </div>

          <div className={`divbodytext fadeIn  ${third ? "visible" : ""}`}>
            <div className="parentVector">
              <div className="vector"></div>
            </div>

            <span className="welcomBodytext">
              You will be guided through the simulation game via this surgical
              display.
            </span>
          </div>

          <div className={`divbodytext fadeIn  ${fourth ? "visible" : ""}`}>
            <div className="parentVector">
              <div className="vector"></div>
            </div>

            <span className="welcomBodytext">
              You will be performing surgical techniques in a hands-on way on
              the SurgeonsLab simulator. The simulator will provide you with
              realistic haptic feedback, allowing you to feel as if you are
              performing an actual surgery.
            </span>
          </div>

          <div className={`divbodytext fadeIn  ${fifth ? "visible" : ""}`}>
            <div className="parentVector">
              <div className="vector"></div>
            </div>

            <span className="welcomBodytext">
              Throughout the game, you will encounter various challenges and
              obstacles that will test your surgical skills and knowledge. You
              will need to use your critical thinking and decision-making
              abilities to overcome these challenges and achieve success.
            </span>
          </div>

          <div className={`divbodytext fadeIn  ${sixth ? "visible" : ""}`}>
            <div className="bottomVector">
              <div className="vector"></div>
            </div>

            <span className="welcomBodytext">
              Remember, the goal of this game is to help you become a skilled
              and competent neurosurgeon. So take your time, practice your
              techniques, and don't be afraid to make mistakes. With hard work
              and determination, you can become a master of neurosurgery. You
              will be guided through the simulation game via this surgical
              display.
            </span>
          </div>

          <div className={`nextdive fadeIn  ${third ? "visible" : ""}`}>
            <span className="Start_here" onClick={() => navigate("/login")}>
              Start here &gt;
            </span>
          </div>
        </div>
      </div>

      {/* 
            <div className='vector1'></div>
            <div className='vector2'></div>
            <div className='vector3'></div>
            <div className='vector4'></div>

            


            <div className='You_will_be_performing'>
            </div>     <div className='you_will_encounter'>
            </div>     <div className='the_goal_of_this_game'>
            </div>

          */}
    </div>
  );
};

export default Welcome;

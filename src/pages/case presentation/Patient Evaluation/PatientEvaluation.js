import React, { useEffect, useState } from "react";
import CaseLeft from "../case left bar/CaseLeft";
import "./PatientEvaluation.scss";
import WelcomeText from "../../../components/welcomeText/WelcomeText";
import listIcon from "../../../assets/images/listIcon.png";
import listItemIcon from "../../../assets/images/Medals.png";
import listItemIconClicked from "../../../assets/images/Medallions.png";

import HeadachesImage from "../../../assets/images/Group-1.png";
import Visual_disturbancesImage from "../../../assets/images/Vector-1.png";
import MriImage from "../../../assets/images/MRI.png";
import CtImage from "../../../assets/images/CT.png";
import bedImage from "../../../assets/images/bed.png";
import ServerImage from "../../../assets/images/Group-2.png";
import { useLocation, useNavigate } from "react-router-dom";
import RightSideBar from "../../../components/rightBar/RightSideBar";

const PatientEvaluation = () => {
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const [indexCompleted, setIndexCompleted] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const state = location;
  let welcome;
  if (state.state !== null) {
    welcome = state.state.welcome;
  }
  const navigate = useNavigate();

  const marginbottom = true;
  // Data for patient evaluation remarks
  const remarksData = [
    {
      id: 1,
      title: "Neurologist",
      date: "April 15, 2022",
      itemClickedIcon: listItemIconClicked,
      itemUnClickedIcon: listItemIcon,
      lastChecked: "Date",
      History:
        "Mrs. Emily Turner reports recurring headaches, primarily in the frontal region, along with occasional visual disturbances",
      Examination:
        "No focal deficits noted in the neurological examination. Initial recommendations include lifestyle modifications and over-the-counter pain relief.",
      desease: [{ name: "Persistent headaches", img: HeadachesImage }],
    },
    {
      id: 2,
      title: "Ophthalmologist",
      date: "May 5, 2022",
      itemClickedIcon: listItemIconClicked,
      itemUnClickedIcon: listItemIcon,
      lastChecked: "Date",
      History:
        "Mrs. Turner reports increased visual disturbances, including blurred vision and peripheral difficulties.",
      Examination:
        "Visual field testing reveals abnormalities. Ophthalmologist recommends further neurological evaluation for potential underlying causes. ",
      desease: [{ name: "Visual disturbances", img: Visual_disturbancesImage }],
    },
    {
      id: 3,
      title: "Neurologist",
      date: "June 10, 2022",
      itemClickedIcon: listItemIconClicked,
      itemUnClickedIcon: listItemIcon,
      lastChecked: "Date",
      History:
        "Symptoms persist despite lifestyle changes, occasional dizziness reported.exploring the complexities of the nervous system to diagnose and treat neurological disorders.",
      Examination:
        "Subtle olfactory disturbances noted in neurological examination. Neurologist orders MRI and CT scan for further investigation.",
      desease: [
        { name: "Headaches", img: HeadachesImage },
        { name: "Visual disturbances", img: Visual_disturbancesImage },
      ],
    },
    {
      id: 4,
      title: "Neurosurgeon (Consultation)",
      date: "June 25, 2022",
      itemClickedIcon: listItemIconClicked,
      itemUnClickedIcon: listItemIcon,
      lastChecked: "Date",
      History:
        "Referral from neurologist due to suprasellar mass on imaging studies.nervous system with advanced surgical techniques and technologies.",
      Examination:
        "Discussion of potential surgery. Neurosurgeon explains need for angiography and neurocognitive testing. Consent for surgery discussed. Further assessments planned.",
      desease: [
        { name: "Abnormal MRI", img: MriImage },
        { name: "CT findings", img: CtImage },
      ],
    },
    {
      id: 5,
      title: "Neurosurgeon (Follow-up)",
      date: "March 25, 2022",
      itemClickedIcon: listItemIconClicked,
      itemUnClickedIcon: listItemIcon,
      lastChecked: "Date",
      History:
        "Pioneered by Harvey Cushing in the late 19th century, neurosurgery has evolved into a vital field addressing disorders of the nervous system",
      Examination:
        "Neurosurgeons conduct intricate neurological assessments, utilizing advanced imaging techniques and clinical observations to diagnose and treat neurological conditions",
      desease: [
        { name: "Surgical planning", img: bedImage },
        { name: "discussion", img: ServerImage },
      ],
    },
  ];
  useEffect(() => {
    console.log("indexComp", indexCompleted);
  }, [indexCompleted]);
  useEffect(() => {
    const fetchMessage = async () => {
      if (welcome) {
        await delay(3000);
        await newMessageShow("Patient Evaluation", 3000);
        await newMessageShow(
          "Examine the chronological remarks to understand the patient’s medical history.",
          3500
        );
      }
    };
    fetchMessage();
  }, []);
  const newMessageShow = async (message, time) => {
    setShowMessage(true);
    setMessage(message);
    await delay(time);
    setShowMessage(false);
  };
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  return (
    <div className="evaluation">
      <div className="leftbar">
        <CaseLeft case={1} />
      </div>

      <div className="evaluationbody">
        <div className="toptext">
          <div className="textdiv">
            <span>Patient Evaluation</span>
          </div>
        </div>
        <div className="welcomecomp">
          {/* Display a welcome text component */}
          {showMessage && <WelcomeText message={message} />}
        </div>
        <div className="evaluationcontentbody">
          <span className="initialText">
            Please evaluate the patient history details below before proceeding
            to initial radiological examination (next) step.
          </span>

          <div className="patientContent">
            <span>Remarks</span>
            <div className="contentdivparent">
              <div className="listdiv">
                {/* Display a list of patient remarks items */}

                {remarksData.map((item, index) => (
                  <div
                    key={index}
                    className={
                      clickedItemIndex === index ? "clickedItem" : "Item"
                    }
                    onClick={() => {
                      setClickedItemIndex(index);
                      setIndexCompleted(() => {
                        const find = indexCompleted.filter(
                          (ind) => ind === index
                        );
                        return find.length === 0
                          ? [...indexCompleted, index]
                          : [...indexCompleted];
                      });
                    }}
                  >
                    <div className="imgdiv">
                      <img
                        src={
                          indexCompleted.includes(index)
                            ? item.itemClickedIcon
                            : item.itemUnClickedIcon
                        }
                        alt=""
                      />
                    </div>
                    <div className="textdiv2">
                      <span className="span1">{item.title}</span>
                      <span className="span2">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              {clickedItemIndex !== null && (
                <div className="resultdiv">
                  <div className="selecteditem">
                    {/* Display the selected patient remarks item */}
                    <div className="Item">
                      <div className="imgdiv">
                        <img
                          src={remarksData[clickedItemIndex].itemClickedIcon}
                          alt=""
                        />
                      </div>
                      <div className="textdiv2">
                        <span className="span1">
                          {remarksData[clickedItemIndex].title}
                        </span>
                        <span className="span2">
                          {remarksData[clickedItemIndex].date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="imagesofitem">
                      {remarksData[clickedItemIndex].desease.map((desease) => {
                        return (
                          <div className="parnt">
                            <img src={desease.img} alt="" />
                            <span>{desease.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="hrr" />
                  {/* {
                        remarksData
                      } */}
                  <div className="content">
                    <div>
                      <span className="textStyle">Last Checked</span>
                      <span>{remarksData[clickedItemIndex].date}</span>
                    </div>

                    <div>
                      <span className="textStyle">History</span>
                      <span>{remarksData[clickedItemIndex].History}</span>
                    </div>
                    <div>
                      <span className="textStyle">Examination</span>
                      <span>{remarksData[clickedItemIndex].Examination}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rightbar">
        <RightSideBar marginbottom={marginbottom} />
      </div>

      <div
        className="nextbtndiv"
        onClick={() => navigate("/casePreparation/RadiologicalExamination")}
      >
        <span className="nextbtn">Next</span>

        <div className="arror">
          {" "}
          <span> &gt; </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default PatientEvaluation;

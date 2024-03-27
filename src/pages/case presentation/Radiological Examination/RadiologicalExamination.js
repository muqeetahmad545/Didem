import React, { useEffect, useState } from "react";
import CaseLeft from "../case left bar/CaseLeft";
import WelcomeText from "../../../components/welcomeText/WelcomeText";
import "./RadiologicalExamination.scss";

import { useNavigate } from "react-router-dom";
import DwvComponent from "../../../components/DwvComponent";
import { Element } from "react-scroll";
// import { Affix, Slider } from "antd";
import { Slider } from "@mui/material";

const RadiologicalExamination = () => {
  const navigate = useNavigate();
  // State variables to manage image views and image URLs

  const [Axial, setaxial] = useState(false);
  const [Coronal, setcronal] = useState(false);
  const [saggital, setsaggital] = useState(false);
  const [threeD, setthreeD] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [nextButton, setNextButton] = useState(false);

  const [patientInfo, setPatientInfo] = useState([]);

  // Effect to fetch dicom image URLs and set image views
  useEffect(() => {
    // GitHub repository information which contains dicoms images
    const owner = "MSarfarazMeyo";
    const repo = "rawfileurl";
    const folderPath = ""; // Provide the folder path if it's inside a subfolder

    // Make a request to the GitHub API to get the contents of the folder
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`
    )
      .then((response) => response.json())
      .then((data) => {
        const urls = data.map((item) => item.download_url);

        setImageUrls(urls);

        setTimeout(() => {
          setaxial(true);

          // After 2 seconds, set the next state
          setTimeout(() => {
            setcronal(true);

            // After another 2 seconds, set the final state
            setTimeout(() => {
              setsaggital(true);
              setTimeout(() => {
                setNextButton(true);
              }, [1000]);
            }, 2000);
          }, 2000);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to parse and set patient information

  const myFun = (args) => {
    if (!patientInfo.length) {
      if (args?.length) {
        const requiredInfo = args.filter(
          (item) =>
            item.name === "PatientName" ||
            item.name === "PatientID" ||
            item.name === "PatientID" ||
            item.name === "PatientBirthDate" ||
            item.name === "PatientSex" ||
            item.name === "PatientAge" ||
            item.name === "PatientSize"
        );

        if (requiredInfo?.length) {
          const custoobj = requiredInfo.map((item) => {
            if (item.name === "PatientName") {
              return { PatientName: item.value };
            }
            if (item.name === "PatientID") {
              return { PatientID: item.value };
            }

            if (item.name === "PatientBirthDate") {
              return { PatientBirthDate: item.value };
            }
            if (item.name === "PatientSex") {
              return { PatientSex: item.value };
            }
            if (item.name === "PatientAge") {
              return { PatientAge: item.value };
            }
            if (item.name === "PatientSize") {
              return { PatientSize: item.value };
            }
          });
          if (custoobj?.length) {
            setPatientInfo(custoobj);
          }
        }
      }
    }
  };

  return (
    <div className="RadiologicalExamination">
      <div className="leftbar">
        <CaseLeft case={2} />
      </div>

      <div className="evaluationbody">
        <div className="toptext">
          <div className="textdiv">
            <span>Radiological Examination</span>
          </div>
        </div>

        <div className="imagepreviewer">
          {imageUrls?.length && Axial ? (
            // Display Axial view
            <div className="dicomParent1">
              <div className="image">
                <div className="header">
                  <span>Patient Id : {patientInfo[1]?.PatientID}</span>
                  <span>DOB : {patientInfo[2]?.PatientBirthDate}</span>
                  <span>patient Gender : {patientInfo[3]?.PatientSex}</span>
                </div>
                <div className="dicomParent">
                  <div className="dicomLeft">
                    <div className="top">
                      <span>07/2016</span>
                      <span>Axial</span>
                    </div>
                    <div className="center">
                      <span>R</span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                  <div className="dicomCenter">
                    <div className="top">
                      <span>A</span>
                    </div>
                    <div className="center">
                      <DwvComponent
                        imageUrls={imageUrls}
                        id="id3"
                        imgorientation="axial"
                        myFun={myFun}
                      />
                    </div>
                    <div className="bottom">
                      <span>P</span>
                    </div>
                  </div>
                  <div className="dicomLeft">
                    <div className="top">
                      <span>{patientInfo[0]?.PatientName}</span>

                      <span>Width: 512</span>
                      <span>height: 512 </span>
                    </div>
                    <div className="center">
                      <span>L </span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Slider
                track={false}
                orientation="vertical"
                className="slider"
                aria-labelledby="track-false-slider"
                defaultValue={30}
              /> */}
            </div>
          ) : (
            <div> Loading axial... </div>
          )}

          {imageUrls?.length && Coronal ? (
            // Display Coronal view
            <div className="dicomParent1">
              <div className="image">
                <div className="header">
                  <span>Patient Id : {patientInfo[1]?.PatientID}</span>
                  <span>DOB : {patientInfo[2]?.PatientBirthDate}</span>
                </div>
                <div className="dicomParent">
                  <div className="dicomLeft">
                    <div className="top">
                      <span>07/2016</span>
                      <span>Coronal</span>
                    </div>
                    <div className="center">
                      <span>R</span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                  <div className="dicomCenter">
                    <div className="top">
                      <span>A</span>
                    </div>
                    <div className="center">
                      <DwvComponent
                        imageUrls={imageUrls}
                        id="id4"
                        imgorientation="coronal"
                        myFun={myFun}
                      />
                    </div>
                    <div className="bottom">
                      <span> P</span>
                    </div>
                  </div>
                  <div className="dicomLeft">
                    <div className="top">
                      <span>{patientInfo[0]?.PatientName}</span>

                      <span>Width: 512</span>
                      <span>height: 512 </span>
                    </div>
                    <div className="center">
                      <span>L </span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Slider
                track={false}
                orientation="vertical"
                className="slider"
                aria-labelledby="track-false-slider"
                defaultValue={30}
              /> */}
            </div>
          ) : (
            <div> Loading.... </div>
          )}

          {imageUrls?.length && saggital ? (
            // Display saggital view

            <div className="dicomParent1">
              <div className="image">
                <div className="header">
                  <span>Patient Id : {patientInfo[1]?.PatientID}</span>
                  <span>DOB : {patientInfo[2]?.PatientBirthDate}</span>
                </div>
                <div className="dicomParent">
                  <div className="dicomLeft">
                    <div className="top">
                      <span>07/2016</span>
                      <span>saggital</span>
                    </div>
                    <div className="center">
                      <span>R</span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                  <div className="dicomCenter">
                    <div className="top">
                      <span>A</span>
                    </div>
                    <div className="center">
                      <DwvComponent
                        imageUrls={imageUrls}
                        id="id2"
                        imgorientation="sagittal"
                        myFun={myFun}
                      />
                    </div>
                    <div className="bottom">
                      <span> P</span>
                    </div>
                  </div>
                  <div className="dicomLeft">
                    <div className="top">
                      <span>{patientInfo[0]?.PatientName}</span>

                      <span>Width: 512</span>
                      <span>height: 512 </span>
                    </div>
                    <div className="center">
                      <span>L </span>
                    </div>
                    <div className="bottom">
                      <span> DV exyene infershimg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sliderDiv">
                {/* <Slider
                  track={false}
                  orientation="vertical"
                  className="slider"
                  aria-labelledby="track-false-slider"
                  defaultValue={30}
                /> */}
              </div>
            </div>
          ) : (
            <div> Loading coronal... </div>
          )}

          {imageUrls?.length && threeD ? (
            <div className="dicomParent1">
              <div className="image">
                <div className="header">
                  <span>Patient Id : {patientInfo[1]?.PatientID}</span>
                  <span>DOB : {patientInfo[2]?.PatientBirthDate}</span>
                </div>

                <div className="headerbottom">
                  <DwvComponent
                    imageUrls={imageUrls}
                    id="id1"
                    imgorientation="sagittal"
                    myFun={myFun}
                  />
                </div>
              </div>
              <div className="sliderDiv">
                {/* <Slider
                  track={false}
                  orientation="vertical"
                  className="slider"
                  aria-labelledby="track-false-slider"
                  defaultValue={30}
                /> */}
              </div>
            </div>
          ) : (
            <div> Loading sagittal... </div>
          )}
        </div>

        <div className="footer">
          <div className="parentfooter">
            <div
              className="btndiv"
              style={{
                background: Axial ? "black" : "1a1a1a",
                border: Axial ? "1px solid #88bbef" : "1px solid  #233342",
                cursor: "pointer",
              }}
              onClick={() => setaxial(!Axial)}
            >
              {" "}
              <span>Axial</span>
            </div>
            <div
              className="btndiv"
              style={{
                background: Coronal ? "black" : "1a1a1a",
                border: Coronal ? "1px solid #88bbef" : "1px solid  #233342",
                cursor: "pointer",
              }}
              onClick={() => setcronal(!Coronal)}
            >
              {" "}
              <span>Coronal</span>
            </div>
            <div
              className="btndiv"
              style={{
                background: saggital ? "black" : "1a1a1a",
                border: saggital ? "1px solid #88bbef" : "1px solid  #233342",
                cursor: "pointer",
              }}
              onClick={() => setsaggital(!saggital)}
            >
              {" "}
              <span>Sagittal</span>
            </div>
            <div
              className="btndiv"
              style={{
                background: threeD ? "black" : "1a1a1a",
                border: threeD ? "1px solid #88bbef" : "1px solid  #233342",
                cursor: "pointer",
              }}
              onClick={() => setthreeD(!threeD)}
            >
              {" "}
              <span>3D</span>
            </div>
          </div>
        </div>
      </div>

      {nextButton ? (
        <div
          className="nextbtndiv"
          onClick={() => navigate("/casePreparation/PatientPositioning")}
        >
          <span className="nextbtn">Next</span>

          <div className="arror">
            {" "}
            <span> &gt; </span>{" "}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RadiologicalExamination;

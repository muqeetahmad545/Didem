import React, { useEffect, useState } from "react";
import "./WelcomeText.scss"; 

import img from "../../assets/images/Ekran Resmi 2023-04-07 22.21 1.png";
import { MessageOutlined } from "@ant-design/icons";
const WelcomeText = ({message}) => {
  const [showMessage, setShowMessage]= useState(false)
  useEffect(()=>{
    setTimeout(()=>{
      setShowMessage(true)
    },500)
  },[])
  return (
    <div className="WelcomeText">
      {" "}
      <img src={img} alt="" />{" "}
      {
        showMessage &&<span className="messageAnimation">{message}</span>
      }
      
      <div className="icondiv">
        {" "}
        <MessageOutlined />{" "}
      </div>
    </div>
  );
};

export default WelcomeText;

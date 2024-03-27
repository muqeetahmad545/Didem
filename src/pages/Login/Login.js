import React, { useContext, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import img from "../../assets/images/login.png";

import Username from "../../assets/icons/username.png";
import Surname from "../../assets/icons/surname.png";
import Surgical from "../../assets/icons/surgical_experiance.png";
import AppContext from "../../context/AppContext";

const Login = () => {
  // Initialize state to store user input
  const [userObj, setUserObj] = useState({
    SurName: "",
    UserName: "",
    Surgical_Experiance: "",
  });

  // Initialize React Router's navigate function
  const navigate = useNavigate();

  // Handle input changes and update the user object
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem("user", JSON.stringify(userObj));
    fetch("http://0.0.0.0:18080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to submit user data");
        }
      })
      .then((data) => {
        // Save the response data to local storage
        localStorage.setItem("user", JSON.stringify(data));
        alert("User data submitted successfully!");
        navigate("/guidance");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      navigate('/guidance');
  };

  return (
    <div className="login">
      <div className="textclass">
        <div className="logintext">Log-in</div>
      </div>
      <div className="boxclass">
        <div className="rectangle">
          <div className="inputdiv">
            <Input
              size="large"
              placeholder="Surname"
              name="SurName"
              onChange={handleInputChange}
              prefix={<img src={Username} alt="img" />}
            />
            <div className="hrrr" />
          </div>
          <div className="inputdiv">
            <Input
              size="large"
              placeholder="Username"
              name="UserName"
              onChange={handleInputChange}
              prefix={<img src={Surname} alt="img" />}
            />
            <div className="hrrr" />
          </div>{" "}
          <div className="inputdiv">
            <Input
              size="large"
              placeholder="Surgical Experience "
              name="Surgical_Experiance"
              onChange={handleInputChange}
              prefix={<img src={Surgical} alt="img" />}
            />
            <div className="hrrr" />
          </div>
        </div>
      </div>
      {userObj.SurName && userObj.UserName && (
        // Show a button to submit the form when all fields are filled
        <div className="buttonclass">
          <span className="loginnextpage" onClick={handleSubmit}>
            Start &gt;
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;

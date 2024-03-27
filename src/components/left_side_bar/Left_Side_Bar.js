import React, { useContext } from "react";
import "./Left_Side_Bar.scss";
import {
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Button, Modal } from "antd";
import { useState } from "react";

const Left_Side_Bar = () => {
  // Initialize the navigation function
  const navigate = useNavigate();
  // Access the context to set and get the active tab
  const context = useContext(AppContext);
  const { activeTab, setActiveTab, resetStates } = context;

  // State and functions for the exit confirmation modal

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure to exit the game?");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // Function to handle the "Exit" button click in the modal
    setConfirmLoading(true);

    setTimeout(() => {
      // Clear local storage and navigate to the home page
      localStorage.clear();
      setOpen(false);
      setConfirmLoading(false);
      resetStates()

      navigate("/");
    }, 2000);
  };
  const handleCancel = () => {
    // Function to handle the "Cancel" button click in the modal
    setOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="divparent">
        <div className="div1">
          <LogoutOutlined onClick={showModal} />
          <SettingOutlined />
        </div>
        <div className="div2">
          <div
            className="div2child"
            style={{
              borderRight: activeTab === "home" ? "1px solid #88BBEF" : "none",
            }}
          >
            <HomeOutlined
              style={{ color: activeTab === "home" ? "#88BBEF" : "white" }}
              onClick={() => {
                setActiveTab("home");
                navigate("/home");
              }}
            />
          </div>

          <div
            className="div2child"
            style={{
              borderRight: activeTab === "case" ? "1px solid #88BBEF" : "none",
            }}
          >
            <FolderOutlined
              style={{ color: activeTab === "case" ? "#88BBEF" : "white" }}
              onClick={() => {
                setActiveTab("case");
                navigate("/casePreparation/patientEvaluation");
              }}
            />
          </div>

          <div
            className="div2child"
            style={{
              borderRight: activeTab === "score" ? "1px solid #88BBEF" : "none",
            }}
          >
            <StockOutlined
              style={{ color: activeTab === "score" ? "#88BBEF" : "white" }}
              onClick={() => {
                setActiveTab("score");
                navigate("/dashboard");
              }}
            />
          </div>
        </div>
      </div>

      <Modal
        okText="Exit"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Left_Side_Bar;

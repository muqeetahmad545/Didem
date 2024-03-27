import React, { useContext, useEffect, useState } from "react";
import "./NavBar.scss";
import { BellOutlined, HomeOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Button, Modal } from "antd";

import { SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const NavBar = () => {
  // State to store user data retrieved from local storage
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      // If data exists in local storage, parse it and set it to the state
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  // Function to navigate to different routes
  const navigate = useNavigate();

  // Access the context to set and get the active tab
  const context = useContext(AppContext);

  const { activeTab, setActiveTab } = context;
  // State and functions for the exit confirmation modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure to exit the game?");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      localStorage.clear();
      setOpen(false);
      setConfirmLoading(false);
      navigate("/");
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: <span>{userData?.SurName}</span>,
    },
    {
      key: "4",
      danger: true,
      label: <span onClick={showModal}>Log Out</span>,
    },
  ];

  return (
    <div className="navbarparent">
      <div className="rightdiv">
        <BellOutlined style={{ cursor: "pointer" }} />
        <HomeOutlined
          onClick={() => {
            setActiveTab("home");
            navigate("/home");
          }}
          style={{ cursor: "pointer" }}
        />

        <Dropdown
          menu={{
            items,
          }}
        >
          <DownOutlined />
        </Dropdown>
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

export default NavBar;

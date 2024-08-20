// src/components/SuccessPage.jsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Successfully Submitted!"
      subTitle="Your guest information has been submitted successfully."
      extra={[
        <Button type="primary" key="home" onClick={() => navigate("/")}>
          Go to Home
        </Button>,
      ]}
    />
  );
};

export default SuccessPage;

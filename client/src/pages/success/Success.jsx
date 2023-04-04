import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", {
          payment_intent,
        });

        setTimeout(() => {
          navigate("/orders");
        }, 4000);
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "100px 0px",
        fontSize: "18px",
        color: "#1dbf73",
        textAlign: "center",
      }}
    >
      <div
        style={{
          border: "2px solid #1dbf73",
          padding: 8,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="./img/greencheck.png" alt="" />
      </div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;

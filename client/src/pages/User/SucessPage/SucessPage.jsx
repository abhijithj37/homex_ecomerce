import React, { useEffect, useState } from "react";
import style from "./SucessPage.module.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RetrieveSession } from "../../../Apis/UserApi";
// import { RetrieveSession } from "../../../Apis/UserApi";

function SucessPage() {
 const navigate = useNavigate();
 const [orderStatus,setOrderStatus]=useState()

  useEffect(() => {
    const sessionid = localStorage.getItem("SessionID");
    console.log("sessionid:", sessionid);

    let id ={
      sessionid
    }
  
    if (sessionid) {
      RetrieveSession(id)
        .then((response) => {
          console.log("Payment session status retrieved", response.data);
          setOrderStatus(response.data)
        })
        .catch((error) => {
          console.error("Error retrieving payment session status:", error);
  
          // Handle the error, for example, redirect to an error page or show a user-friendly message
          // You can customize this based on your application's requirements
        });
    } else {
      navigate("/my-account");
    }

      // Cleanup function
      // return () => {
      //   // Remove SessionID from localStorage when leaving the SucessPage
      //   localStorage.removeItem("SessionID");
      //   console.log("SessionID removed from localStorage");
      // };
  }, [navigate]);


  return (
    <div className={style.sucess_page}>
      <p className={style.sucess_txt}>{orderStatus?.message}</p>
      <IoCheckmarkCircleOutline size={40} style={{ color: "white" }} />
      <div className={style.order}>
        <p>Order Details</p>
        <hr />
        <p className={style.order_id}>Order ID: {orderStatus?.orderDetails?.orderId}</p>
        <p>Your Email: {orderStatus?.orderDetails?.customerEmail}</p>
        <p>HOMEX SMXART IR REMOTE CONTROL: 2pc</p>
        <p>HOMEX SMART PIR SENSOR: 1px</p>
        <p>Total Paid:$200</p>
      </div>
      <Link to={"/my-account"}>
        <button className={style.back_btn}>Back to shopping</button>
      </Link>
    </div>
  );
}

export default SucessPage;

import React, { useEffect } from "react";
import style from "./CancelPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { RetrieveSession } from "../../../Apis/UserApi";

function CancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionid = localStorage.getItem("SessionID");
    console.log("sessionid:", sessionid);

    let id = {
      sessionid,
    };

    if (sessionid) {
      RetrieveSession(id)
        .then((response) => {
          console.log("Payment session status retrieved", response.data);
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
    return () => {
      // Remove SessionID from localStorage when leaving the CancelPage
      localStorage.removeItem("SessionID");
      console.log("SessionID removed from localStorage");
    };
  }, [navigate]);

  return (
    <div className={style.cancel_page}>
      <p className={style.sucess_txt}> Payment Faild</p>
      <MdOutlineCancel size={40} style={{ color: "white" }} />
      <div className={style.order}>
        {/* <p>Order Details</p>
        <hr />
        <p className={style.order_id}>Order ID:123456789</p>
        <p>Your Email:ananthus.ann@gmail.com</p>
        <p>HOMEX SMXART IR REMOTE CONTROL: 2pc</p>
        <p>HOMEX SMART PIR SENSOR: 1px</p> */}
        {/* <p>Total Paid:$200</p> */}
      </div>
      <Link to={"/cart"}>
        <button className={style.back_btn}>Back to Cart</button>
      </Link>
    </div>
  );
}

export default CancelPage;

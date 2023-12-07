import React, { useState } from "react";
import { forgotPassword } from "../../../Apis/UserApi";
import style from "./ForgotPassword.module.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your API function for forgot password
      await forgotPassword({ email });
      setMessage("Password reset link sent to your email.");
      setError("");
    } catch (error) {
      setMessage("");

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404) {
          setError("User not found. Please check your email address.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Error sending reset email. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={style.forgot}>
      <p className={style.heading}>
        FORGOT <span className={style.heading_span}>PASSWORD</span>
      </p>{" "}
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <label className={style.label}>Email</label> <br />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Your registed email"
            className={style.input}
            
          />
        </div>

        <button  className={style.btn} type="submit">Reset Password</button>
      </form>
      {message && <p className={style.mess}>{message}</p>}
      {error && <p style={{ color: "red" ,textAlign:"center",padding:"20px",fontWeight:"500"}}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;

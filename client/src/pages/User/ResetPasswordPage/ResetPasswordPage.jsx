import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ResetPasswordPage.module.css";
import { resetPassword } from "../../../Apis/UserApi";
const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Call your API function for resetting the password
      const response = await resetPassword({ token, password });
      setMessage(response.data.message);
      Navigate("/login");

      setError('');
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error resetting password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
}

  return (
    <div>
      <p className={style.heading}>
        RESET <span className={style.heading_span}>PASSWORD</span>
      </p>
      <form onSubmit={handleSubmit} className={style.form}>

        <div>
          <label>New Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={style.input}

          />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input
          className={style.input}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <button className={style.btn} type="submit">
          Reset Password
        </button>

      </form>
      {message && (
        <p style={{ color: "green" ,textAlign:"center",padding:"20px",fontWeight:"500"}}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "red" ,textAlign:"center",padding:"20px",fontWeight:"500"}}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ResetPasswordPage;

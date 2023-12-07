
import React, { useState } from "react";
import "./AdminLoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { Adminlogin } from "../../../Apis/AdminApi";


function AdminLoginPage() {
  const [otpLogin, setOtpLogin] = useState(false);
  const [regularLogin, setregularLogin] = useState(true);
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const onFinish = (values) => {
    console.log("valuess:", values);

    Adminlogin(values).then((response) => {
      console.log("login then..", response);
      console.log("admin token..", response.data.AdminToken);

      localStorage.setItem("AdminToken", response.data.AdminToken);

      Navigate("/admin");
    }).catch((error) => {
      console.log(error?.response?.data?.error);
      setError(error?.response?.data?.error);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="LoginWrapper">
      <div className="login_form_container">
        <>
          <Form
            name="basic"
            labelCol={{
              span: 1,
            }}
            wrapperCol={{
              span: 100,
            }}
            style={{}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <label style={{ fontSize: "1rem" }} htmlFor="">
              Username
            </label>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                style={{
                  height: "45px",
                  fontSize: "1rem",
                }}
                onChange={() => {
                  setError("");
                }}
              />
            </Form.Item>
            <label style={{ fontSize: "1rem" }} htmlFor="">
              Password
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                style={{
                  height: "45px",
                  fontSize: "1rem",
                }}
                onChange={() => {
                  setError("");
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "blue", marginLeft: "12px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p
            className="loginTxtOtp"
            // onClick={() => {
            //   setOtpLogin(true);
            //   setregularLogin(false);
            // }}
          >
            <p className="login_err">{error}</p>
          </p>
        </>
      </div>
    </div>
  );
}

export default AdminLoginPage;

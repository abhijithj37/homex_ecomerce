import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Upload, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
import style from "./BlogForm.module.css";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function BlogForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleClick = () => {
    navigate("/admin/blog-details");
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("heading", values.heading);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("description", values.description);

    // Assuming 'images' is the name used in the form for the file input
    if (values.images && values.images.length > 0) {
      formData.append("images", values.images[0].originFileObj);
    }

    try {
      const token = localStorage.getItem("AdminToken");
      const response = await axios.post(`${baseURL}/admin/add-blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accesstoken: token,
        },
      });

      console.log("blog status:", response.status); // Log response status code
      console.log("blog data:", response.data); // Log response data

      if (response.status === 200) {
        message.success("New blog added");
        navigate("/admin/blog-details", { replace: true });
      } else {
        location.reload();
      }
    } catch (error) {
      window.scrollTo(0, 0);
      console.error("Error adding blog:", error);
      message.error(`Failed to add blog: ${error.response?.data?.error}`);
    } finally {
      console.log("Finally block executed");
    }
  };

  return (
    <>
      <div className={style.head_container}>
        <div className={style.head_text}>New blog post</div>
      </div>
      <Button type="primary" onClick={handleClick} icon={<ArrowLeftOutlined />}>
        Back
      </Button>
      <div className={style.form_container}>
        <div className={style.form}>
          <Form
            form={form}
            labelCol={{}}
            wrapperCol={{}}
            layout="horizontal"
            style={{
              fontWeight: "500",
              maxWidth: "100%",
            }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              label="Heading"
              name="heading"
              rules={[{ required: true, message: "Please enter the heading" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="DatePicker"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Upload product images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => normFile(e)}
            >
              <Upload listType="picture-card" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <div className={style.submit_btn}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={style.submit}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default BlogForm;

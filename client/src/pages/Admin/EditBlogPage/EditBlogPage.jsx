// import React from "react";
// import FormEditProduct from "../../../components/Admin/FormEditProduct/FormEditProduct";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import style from './EditBlogPage.module.css'
// function EditBlogPage() {
//   const location = useLocation();

//   const { blog } = location.state;

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/admin/blog-details");
//   };

//   return (
//     <div className={style.ProductsDetailsPage}>
//       <div className={style.head_container}>
//         <div className={style.head_text}>Edit or update blog</div>
//       </div>

//       <div className={style.btn}>
//         <Button
//           type="primary"
//           onClick={handleClick}
//           icon={<ArrowLeftOutlined />}
//         >
//           Back
//         </Button>
//       </div>

//     </div>
//   );
// }

// export default EditBlogPage;
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Upload, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import style from "./EditBlogPage.module.css";
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function BlogForm() {
  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    formData.append("heading", values.heading);
    formData.append("date", values.date.toISOString()); // Convert date to ISO format
    formData.append("description", values.description);

    if (values.images && values.images.length > 0) {
      formData.append("images", values.images[0].originFileObj);
    }

    try {
      const token = localStorage.getItem("AdminToken");
      const blogId = blog._id;

      const response = await axios.put(
        `${baseURL}/admin/update-blog/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accesstoken: token,
          },
        }
      );

      console.log("blog status:", response.status); // Log response status code
      console.log("blog data:", response.data); // Log response data

      if (response.status === 200) {
        message.success("Blog updated successfully");
        navigate("/admin/blog-details", { replace: true });
      } else {
        location.reload();
      }
    } catch (error) {
      window.scrollTo(0, 0);
      console.error("Error updating blog:", error);
      message.error(`Failed to update blog: ${error.response?.data?.error}`);
    }
  };

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();

  const { blog } = location.state;

  console.log("blog:", blog);

  const handleClick = () => {
    navigate("/admin/blog-details");
  };

  const initialValues = {
    heading: blog.heading,
    date: dayjs(blog.date, "YYYY/MM/DD"),
    description: blog.description,
    images: [
      {
        uid: "-1",
        name: blog.image,
        status: "done",
        url: `${baseURL}/images/${blog.image}`,
      },
    ],
  };

  return (
    <>
       <div className={style.head_container}>
        <div className={style.head_text}>Blog Details</div>
      </div>

      <Button
          type="primary"
          onClick={handleClick}
          icon={<ArrowLeftOutlined />}
        >
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
          initialValues={initialValues} // Set initial values for the form
        >
          <Form.Item
            label="Heading"
            name="heading"
            rules={[{ required: true, message: "Please enter the heading" }]}
          >
            <Input />
          </Form.Item>
          {/* <p>{new Date(blog.date).toLocaleDateString()}</p> */}

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
            <TextArea rows={8} />
          </Form.Item>

          <Form.Item
            label="Blog images"
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
{/* 
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
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

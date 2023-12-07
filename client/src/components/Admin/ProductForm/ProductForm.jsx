import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  message,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GetCategory } from "../../../Apis/AdminApi";
import style from "./ProductForm.module.css";
const { TextArea } = Input;
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

function ProductForm() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("videoLink", values.videoLink);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("specification", values.specification);
    formData.append("featured", values.featured);
    values.images.forEach((image, index) => {
      formData.append(`images`, image.originFileObj);
    });

    try {
      const token = localStorage.getItem("AdminToken");
      const response = await axios.post(
        `${baseURL}/admin/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accesstoken: token,
          },
        }
      );
      console.log("product status:", response.status); // Log response status code
      console.log("product data:", response.data); // Log response data
      if (response.status === 200) {
        message.success("New product added");
        navigate("/admin/product-details", { replace: true });
      } else {
        location.reload();
      }
    } catch (error) {
      window.scrollTo(0, 0);

      console.error("Error adding product:", error);
      message.error(`"Failed to add product ${error.response.data?.error}`);
    } finally {
      console.log("Finally block executed"); // Log that the finally block was executed
    }
  };

  useEffect(() => {
    GetCategory().then((catagories) => {
      setCategory(catagories.data);
    });
  }, []);

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{ maxWidth: 1300 }}
      onFinish={onFinish}
      className={style.from_wrapper}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
        className={style.label}
      >
        <Input className={style.input} />
      </Form.Item>

      <Form.Item className={style.label} label="Youtube video id" name="videoLink">
        <Input className={style.input} />
      </Form.Item>

      <Form.Item className={style.label} label="Category" name="category">
        <Select className={style.input}>
          {category.map((category, index) => (
            <Select.Option value={category.name} key={index}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item className={style.label} label="Price" name="price">
        <InputNumber className={style.input} />
      </Form.Item>

      <Form.Item className={style.label} label="Description" name="description">
        <TextArea rows={8} className={style.input} />
      </Form.Item>

      <Form.Item
        className={style.label}
        label="Specification"
        name="specification"
      >
        <TextArea rows={8} className={style.input} />
      </Form.Item>

      <Form.Item
        className={style.label}
        label="featured product"
        name="featured"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        className={style.label}
        label="Upload product images"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={(e) => normFile(e)}
      >
        <Upload listType="picture-card" maxCount={4}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductForm;

import style from "./FormEditProduct.module.css";
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
import { useNavigate } from "react-router-dom";
import { GetCategory, GetSingleProduct } from "../../../Apis/AdminApi";
import axios from "axios";
const { TextArea } = Input;
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

function FormEditProduct({ product }) {
  console.log("{product._id}", product._id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [productDetails, setProductDetails] = useState();

  console.log("productDetails:", productDetails);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // const onFinish = async (values) => {
  //   // edit-product/${productId}
  //   EditProduct
  // };

  let productId = product._id;

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("productId", product._id);
    formData.append("title", values.title);
    formData.append("videoLink", values.videoLink);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("specification", values.specification);
    formData.append("featured", values.featured);
    // values.images.forEach((image, index) => {
    //   formData.append(`images`, image.originFileObj);
    // });

    try {
      const token = localStorage.getItem("AdminToken");
      const response = await axios.put(
        `${baseURL}/admin/edit-product/${productId}`,
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
    GetSingleProduct(product._id).then((responseProduct) => {
      setProductDetails(responseProduct.data);
      // Set the initial values for the form based on productDetails
      form.setFieldsValue({
        title: responseProduct.data.title,
        videoLink: responseProduct.data.videolink,
        category: responseProduct.data.category,
        price: responseProduct.data.price,
        description: responseProduct.data.description,
        specification: responseProduct.data.specification,
        featured: responseProduct.data.isfeatured,
        images: responseProduct.data.images.map((image) => ({
          uid: image._id,
          name: image.img,
          status: "done",
          url: `${baseURL}/images/` + image.img,
        })),
      });
    });
  }, [product._id, form]);

  useEffect(() => {
    GetCategory().then((catagories) => {
      setCategory(catagories.data);
    });
  }, []);

  return (
    // <div className="">

    // </div>
    <Form
      form={form}
      layout="horizontal"
      style={{ maxWidth: 1300 }}
      onFinish={onFinish}
      initialValues={productDetails} // Set the initial values here
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

      <p style={{ color: "red" }}>Image updating temprorly disabled</p>
      <br />
      <Form.Item
        className={style.label}
        label="Upload product images"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={(e) => normFile(e)}
      >
        <Upload listType="picture-card" maxCount={4} showRemoveIcon={false}>
          {/* <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div> */}
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

export default FormEditProduct;

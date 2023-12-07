import React, { useEffect, useState } from "react";
import ProductForm from "../../../components/Admin/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { GetAllproduct } from "../../../Apis/AdminApi";
import style from "./AddProductPage.module.css";
function AddProductPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/product-details");
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick} icon={<ArrowLeftOutlined />}>
        Back
      </Button>
      <div className={style.add_produt}>
        <div className={style.add_produt_text}>Add New Product</div>
      </div>
      <div className={style.page_wrapper}>
        <ProductForm />
      </div>
    </div>
  );
}

export default AddProductPage;

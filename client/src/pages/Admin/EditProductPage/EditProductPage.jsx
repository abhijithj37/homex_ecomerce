import React from "react";
import style from "./EditProductPage.module.css";
import FormEditProduct from "../../../components/Admin/FormEditProduct/FormEditProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

function EditProductPage() {
  const location = useLocation();

  const { product } = location.state;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/product-details");
  };

  return (
    <div className={style.ProductsDetailsPage}>
      <div className={style.head_container}>
        <div className={style.head_text}>Edit or update product</div>
      </div>

      <div className={style.btn}>
        <Button
          type="primary"
          onClick={handleClick}
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </div>

      <FormEditProduct product={product} />
    </div>
  );
}

export default EditProductPage;

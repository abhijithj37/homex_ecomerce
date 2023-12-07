import React, { useEffect, useState } from "react";
import ProductsTable from "../../../components/Admin/ProductsTable/ProductsTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./ProductsDetailsPage.module.css";
import { GetAllproduct } from "../../../Apis/AdminApi";

function ProductsDetailsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    navigate("/admin/add-product");
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    GetAllproduct()
      .then((products) => {
        setProducts(products.data);
        console.log("products", products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    // Fetch hProducts data when the component mounts
    fetchProducts();
  }, []);

  return (
    <div className={style.ProductsDetailsPage}>
      <div className={style.head_container}>
        <div className={style.head_text}>Products</div>
      </div>{" "}
      <Button type="primary" onClick={handleClick}>
        Add product
      </Button>
      <ProductsTable products={products} fetchProducts={fetchProducts} />
    </div>
  );
}

export default ProductsDetailsPage;

import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import style from "./NewProduct.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import image1 from "../../../assets/images/Screenshot__450_-removebg-preview.png";
import image2 from "../../../assets/images/Screenshot__453_-removebg-preview.png";
import image3 from "../../../assets/images/Screenshot__452_-removebg-preview.png";
import image4 from "../../../assets/images/Screenshot__451_-removebg-preview.png";
import { BsArrowRight } from "react-icons/bs";
import { AllProducts } from "../../../Apis/UserApi";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const newProduct = true;

  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };
  // http://127.0.0.1:5173/products

  const fetchProduct = () => {
    AllProducts().then((response) => {
      setProduct(response.data);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={style.NewProduct}>
      <p className={style.newProduct_text}>
        {" "}
        <span className={style.new_text}>NEW</span> PRODUCT
      </p>
      <div className={style}>
        {product.length > 0 ? (
          <div className={style.ProductCard_container}>
            {product.slice(0, 4).map((product, index) => (
              <div key={index} className={style.product}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className={style.no_product}>No products available</p>
        )}
      </div>
      <p className={style.view_all_text} onClick={handleClick}>
        VIEW MORE <BsArrowRight size={13} />{" "}
      </p>
    </div>
  );
}

export default NewProduct;

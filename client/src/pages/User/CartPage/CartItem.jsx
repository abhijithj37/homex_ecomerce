import React, { useEffect, useState } from "react";
import style from "./YourStyle.module.css";
import { GetSingleProduct } from "../../../Apis/UserApi";
import Currency from "../../../components/User/ProductCard/Currency";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function CartItem({ product, updateQuantity, removeProduct }) {
  // const url = "http://localhost:8000";
  const [productDetails, setProductDetails] = useState("");
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    // Fetch the product details and set the product name
    GetSingleProduct(product.productID)
      .then((response) => {
        setProductDetails(response.data);
        // Check if images are available
        if (response.data.images && response.data.images.length > 0) {
          setProductImage(response.data.images[0].img);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [product.productID, GetSingleProduct]);

  // console.log("productDetails:", productDetails);

  return (
    <div className={style.cart_product_container_div} key={product.productID}>
      <p className={style.name_mobile_view}>{productDetails.title}</p>
      <div className={style.cat_pro_one_flex}>
        <div className={style.cart_img}>
          <div className={style.cart_image_div}>
            <a>
              <img src={baseUrl + "/images/" + productImage} alt="" />
            </a>
          </div>
        </div>
        <div className={style.cart_pro_name}>{productDetails.title}</div>
        <div className={style.cart_other}>
          <div className={style.cart_other_div}>
            <p className={style.cart_price}> {productDetails.price}  <Currency /></p>
            <div className={style.buttons_and_remove_flex}>
              <div className={style.quantity_btn_container}>
                <button
                  className={style.quantity_btn}
                  onClick={() =>
                    updateQuantity(product.productID, product.quantity - 1)
                  }
                >
                  -
                </button>
                {product.quantity}
                <button
                  className={style.quantity_btn}
                  onClick={() =>
                    updateQuantity(product.productID, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className={style.remove_buttton}
                  onClick={() => removeProduct(product.productID)}
                >
                  REMOVE
                </button>
              </div>
            </div>
            <p> {productDetails.price * product.quantity}  <Currency /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

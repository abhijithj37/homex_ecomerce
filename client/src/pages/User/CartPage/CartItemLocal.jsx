import React, { useState, useEffect } from "react";
import style from "./YourStyle.module.css"; // Import your CSS module
import { InputNumber } from "antd";
import { NavLink } from "react-router-dom";
import Currency from "../../../components/User/ProductCard/Currency";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function CartItemLocal({ product, updateQuantityLocal, removeProductLocal }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantityLocal(product._id, newQuantity); // Update local storage first
      setQuantity(newQuantity); // Then update the component's state
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    updateQuantityLocal(product._id, newQuantity); // Update local storage first
    setQuantity(newQuantity); // Then update the component's state
  };

  const handleRemove = () => {
    removeProductLocal(product._id); // Call the removeProduct function
  };
  return (
    <div>
      <div className={style.cart_product_container_div}>
        <p className={style.name_mobile_view}>{product.title}</p>
        <div className={style.cat_pro_one_flex}>
          <div className={style.cart_img}>
            <div className={style.cart_image_div}>
              <a>
                <img src={baseUrl + "/images/" + product.images[0]?.img} alt="" />
              </a>
            </div>
          </div>
          <div className={style.cart_pro_name}>{product.title}</div>
          <div className={style.cart_other}>
            <div className={style.cart_other_div}>
              <div className={style.cart_price}> {product.price}  <Currency /></div>
              <div className={style.buttons_and_remove_flex}>
                <div className={style.quantity_btn_container}>
                  <button
                    className={style.quantity_btn}
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  {quantity}
                  <button
                    className={style.quantity_btn}
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    className={style.remove_buttton}
                    onClick={handleRemove}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <p  className={style.cart_price}> {product.price * quantity}  <Currency /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemLocal;

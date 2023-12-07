import React, { useState, useEffect } from "react";
import {
  GetCartnew,
  GetSingleProduct,
  PutCartnew,
} from "../../../Apis/UserApi";
import style from "./YourStyle.module.css";
import CartItem from "./CartItem";
import CartItemLocal from "./CartItemLocal";
import { NavLink, useNavigate } from "react-router-dom";
import useUserCart from "../../../Store/CartStore";
import Currency from "../../../components/User/ProductCard/Currency";

function CartComponent() {
  const Navigate = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [localStorageCart, setLocalStorageCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize the total price
  const { setUserCartzustand, currentUserCart } = useUserCart();

  //==========IF USER NOT LOGGED STORE CART IN LOCAL STORAGE=====================//cart setCart

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log("storedCart:", storedCart);
    setUserCartzustand(storedCart);
    setLocalStorageCart(storedCart);
  }, []);

  const updateQuantityLocal = (productId, newQuantity) => {
    const updatedCart = localStorageCart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setLocalStorageCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const removeProductLocal = (productId) => {
    const updatedCart = localStorageCart.filter(
      (item) => item._id !== productId
    );
    setUserCartzustand(updatedCart);
    setLocalStorageCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const calculateProductTotalLocal = (product) => {
    return product.price * product.quantity;
  };

  const calculateCartTotalLocal = () => {
    return localStorageCart.reduce(
      (total, product) => total + calculateProductTotalLocal(product),
      0
    );
  };

  //============================IF USER LOGGED IN===============================//
  // Fetch the user's cart data and store it in the state
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user._id) {
    useEffect(() => {
      GetCartnew(user._id)
        .then((response) => {
          setUserCartzustand(response.data[0].products);
          setUserCart(response.data[0].products);
          setUpdatedCart(response.data[0].products);
          calculateTotalPrice(response.data[0].products);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }, []);
  }

  // Function to update the cart quantity
  const updateQuantity = (productID, newQuantity) => {
    if (newQuantity >= 1) {
      const updated = updatedCart.map((product) => {
        if (product.productID === productID) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      setUpdatedCart(updated);
      saveUpdatedCart(updated);
      calculateTotalPrice(updated); // Recalculate the total price
    }
  };

  // Function to remove a product from the cart
  const removeProduct = (productID) => {
    const updated = updatedCart.filter(
      (product) => product.productID !== productID
    );
    setUserCartzustand(updated);
    setUpdatedCart(updated);
    saveUpdatedCart(updated);
    calculateTotalPrice(updated); // Recalculate the total price
  };

  // Function to save the updated cart to the backend
  const saveUpdatedCart = (cartData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      PutCartnew(user._id, cartData)
        .then((response) => {
          setUserCart(cartData);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    }
  };

  // Function to calculate the total price
  const calculateTotalPrice = (cartData) => {
    let total = 0;

    const fetchProductPrice = (product) => {
      return GetSingleProduct(product.productID)
        .then((response) => {
          const price = response.data.price;
          if (price && product.quantity) {
            total += price * product.quantity;
          }
        })
        .catch((error) => {
          console.error("Error fetching product price:", error);
        });
    };

    const fetchPricePromises = cartData.map(fetchProductPrice);

    Promise.all(fetchPricePromises)
      .then(() => {
        setTotalPrice(total);
      })
      .catch((error) => {
        console.error("Error fetching product prices:", error);
      });
  };
  // ====================================================================//
  const handleCheckOut = () => {
    Navigate("/checkout");
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div>
        <p className={style.cart_text}>
          YOUR <span className={style.cart_text_CART}>CART</span>{" "}
        </p>

        <div className={style.cart_cover}>
          <div className={style.cart_container_flex}>
            <div className={style.p_q_t}>
              <div className={style.cart_prce_quantity_total_flex}>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
              </div>
            </div>

            {user
              ? userCart.map((product) => (
                  <CartItem
                    key={product.productID}
                    product={product}
                    updateQuantity={updateQuantity}
                    removeProduct={removeProduct}
                  />
                ))
              : localStorageCart.map((product) => (
                  <CartItemLocal
                    key={product._id}
                    product={product}
                    updateQuantityLocal={updateQuantityLocal}
                    removeProductLocal={removeProductLocal}
                  />
                ))}

            <div className={style.note_and_checkout_container_flex_div}>
              {/* <div className={style.note_div_flex}>
                <p className={style.text_area_heading}>
                  LEAVE A NOTE WITH YOUR ORDER
                </p>
                <textarea className={style.text_area}></textarea>
              </div> */}
              <div className={style.total_and_checkout_div}>
                <p>Overall Total</p>
                {user ? (
                  <h3>
                    <span className={style.overall} id="total">{totalPrice}  <Currency /></span>
                  </h3>
                ) : (
                  <h3>
                    <span  className={style.overall}  id="total"> {calculateCartTotalLocal()}  <Currency /></span>
                  </h3>
                )}

                <p>Tax included and shipping calculated at checkout</p>
                {/* <a href="" >CONTINUE SHOPPING</a> */}
                {/* <br /> */}
                <br className={style.br_new_line} />

                {/* <NavLink to="/checkout">
                <button className={style.checkOut_button} >CHECKOUT</button>
              </NavLink> */}

                  {currentUserCart.length > 0 ? (
                    <button
                      className={style.checkOut_button}
                      onClick={handleCheckOut}
                    >
                      CHECKOUT
                    </button>
                  ) : (
                    ""
                  )}
              </div>
            </div>
            {/* <p>Overall Total: ${calculateCartTotalLocal()}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartComponent;

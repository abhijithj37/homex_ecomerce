import React, { useEffect, useState } from "react";
import style from "./CheckoutPage.module.css";
import {
  GetCartWithTotalPrice,
  GetSingleProduct,
  Payment,
} from "../../../Apis/UserApi";
import { useNavigate } from "react-router-dom";
import Currency from "../../../components/User/ProductCard/Currency";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
import { Button, Spin } from "antd";

function CheckoutPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  let userId = user?._id;
  const navigate = useNavigate();

  const [cartDetails, setCartDetails] = useState({});
  const [productDetails, setProductDetails] = useState([]);

  // Form state variables
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("usa");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart details
        const cartResponse = await GetCartWithTotalPrice(userId);
        setCartDetails(cartResponse.data);

        // Fetch product details for each product in the cart
        if (cartResponse.data.cart && cartResponse.data.cart.products) {
          const promises = cartResponse.data.cart.products.map((product) =>
            GetSingleProduct(product.productID)
          );

          const productResponses = await Promise.all(promises);
          const productDetails = productResponses.map(
            (response) => response.data
          );
          // console.log("Product details:", productDetails);
          setProductDetails(productDetails);
        }
      } catch (error) {
        console.error("Error fetching cart or product details:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [loading, setLoading] = useState();
  const handlePayment = (event) => {
    // console.log("handlePayment:");
    event.preventDefault();
    if (validateForm()) {
      // console.log("validateForm:");

      const cartData = {
        userID: user._id,
        email,
        country,
        firstName,
        lastName,
        address,
        apartment,
        city,
        state,
        pinCode,
        phone,
      };
      setLoading(true);
      Payment(cartData)
        .then((data) => {
          // console.log("data:", data.data.seesionId);

          const SessionID = localStorage.getItem("SessionID");
          if (SessionID) {
            localStorage.removeItem("SessionID");
          }
          localStorage.setItem("SessionID", data.data.seesionId);

          if (data.data.paymentUrl) {
            setLoading(false);

            // console.log("data.data.paymentUrl:", data.data.paymentUrl);
            window.location.href = data.data.paymentUrl;
          } else {
            console.error("Payment URL is missing in the response.");
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate email
    if (!email) {
      valid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      errors.email = "Invalid email address";
    }

    // Validate country
    if (!country) {
      valid = false;
      errors.country = "Country is required";
    }

    // Validate first name
    if (!firstName) {
      valid = false;
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (!lastName) {
      valid = false;
      errors.lastName = "Last name is required";
    }

    // Validate address
    if (!address) {
      valid = false;
      errors.address = "Address is required";
    }

    // Validate city
    if (!city) {
      valid = false;
      errors.city = "City is required";
    }

    // Validate state
    if (!state) {
      valid = false;
      errors.state = "State is required";
    }

    // Validate PIN code
    if (!pinCode) {
      valid = false;
      errors.pinCode = "PIN code is required";
    }

    // Validate phone
    if (!phone) {
      valid = false;
      errors.phone = "Phone number is required";
    }

    // console.log("Validation errors:", errors);

    setFormErrors(errors);
    return valid;
  };

  // const productName=cartDetails?.title;
  // const slicedProductName = productName && productName.length > 1 ? productName.slice(0, 64) : productName;

  return (
    <div className={style.checkout_container_wrapper}>
      <div className={style.checkout_container}>
        <div className={style.address_container}>
          {/* <p className={style.active_section}>{`Cart > Checkout `}</p> */}
          <p className={style.total_price}>
            TOTAL: {cartDetails?.totalPrice} <Currency />
          </p>

          <div>
            <form
              action=""
              onSubmit={handlePayment}
              className={style.from_cotainer}
            >
              <div>
                <input
                  type="email"
                  className={style.input}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className={style.Optionerror}>{formErrors.email}</div>
                <div className={style.save_information_container}>
                  <input type="checkbox" />
                  Email me with news and offers
                </div>
              </div>

              <div>
                <p className={style.country_text}>Country</p>
                <select
                  id="cars"
                  className={style.select}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="india">INDIA</option>
                  <option value="oman">OMAN</option>
                  <option value="usa">USA</option>
                </select>
                <div className={style.Optionerror}>{formErrors.country}</div>
              </div>

              <div className={style.state_city_container}>
                <input
                  type="text"
                  className={formErrors.firstName ? style.error : style.input}
                  placeholder={formErrors.firstName || "First name"}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className={formErrors.lastName ? style.error : style.input}
                  placeholder={formErrors.lastName || "Last name"}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  className={formErrors.address ? style.error : style.input}
                  placeholder={formErrors.address || "Address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Apartment, suit, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              <div className={style.state_city_container}>
                <input
                  type="text"
                  className={formErrors.city ? style.error : style.input}
                  placeholder={formErrors.city || "City"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  className={formErrors.state ? style.error : style.input}
                  placeholder={formErrors.state || "State"}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  className={formErrors.pinCode ? style.error : style.input}
                  placeholder={formErrors.pinCode || "PIN code"}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="number"
                  className={formErrors.phone ? style.error : style.input}
                  placeholder={formErrors.phone || "Phone"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className={style.Optionerror}>{formErrors.phone}</div>

                <div>
                  <div className={style.save_information_container}>
                    <input type="checkbox" />
                    Save this information for next time
                  </div>
                </div>
              </div>

              <div className={style.btns_container}>
                <p>{"< Return to cart"}</p>
                {/* <button
                  type="submit"
                  className={style.singin_up_btn}
                  disabled={loading}
                  style={{ backgroundColor: loading ? "lightgray" : "rgb(211, 180, 74)" }}
                >
                  CONTINUE TO PAYMENT
                </button> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className={style.singin_up_btn}
                  loading={loading}
                  style={{
                    backgroundColor: loading
                      ? "rgb(211, 180, 74)"
                      : "rgb(211, 180, 74)",
                  }}
                >
                  {loading ? "Processing..." : "CONTINUE TO PAYMENT"}
                </Button>
              </div>
            </form>
          </div>
          <div className={style.policy_container}></div>
        </div>

        <div className={style.cart_item_container}>
          <p className={style.cart_item_text}>CART ITEMS</p>

          <div>
            {productDetails.map((product, index) => (
              <div className={style.cart_product_container} key={index}>
                <div className={style.cart_product_img_and_name}>
                  <div className={style.img_contaier}>
                    <img
                      src={baseUrl + "/images/" + product.images[0]?.img}
                      alt=""
                    />
                    <div className={style.qantity}>
                      {cartDetails.cart.products[index]?.quantity}
                    </div>
                  </div>
                  <p className={style.title}>
                    {product.title.length > 64
                      ? product.title.slice(0, 74) + "..."
                      : product.title}
                  </p>
                </div>
                <p className={style.total_per}>
                  {product.price}
                  <Currency />
                </p>
              </div>
            ))}
          </div>

          <div className={style.totals_container}>
            {/* <div className={style.total}>
              <p>Shipping</p>
              <p>$ {cartDetails?.shipping}</p>
            </div> */}
            <div className={style.total}>
              <p>Tax/Vat</p>
              {/* <p>$ {cartDetails?.tax}</p> */}
              <p>Vat/tax are included in total price</p>
            </div>
            <div className={style.total}>
              <p>Total</p>
              <p className={style.total_price}>
                {cartDetails?.totalPrice} <Currency />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

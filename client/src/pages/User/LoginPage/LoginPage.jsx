// import React, { useEffect } from "react";
// import style from "./LoginPage.module.css";
// import { NavLink } from "react-router-dom";
// import { UserLogin } from "../../../Apis/UserApi";

// function LoginPage() {
// useEffect(() => {
//     // Scroll to the top of the page when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//       UserLogin().then((response)=>{

//       })
// return (
//   <div className={style.create_account_container}>
//     <p className={style.heading}>
//       LOGIN TO <span className={style.heading_span}>ACCOUNT</span>
//     </p>

//     <div className={style.from_cotainer}>
//       <div>
//         <p className={style.input_lable}>EMAIL</p>
//         <input type="email" className={style.input} />
//       </div>

//       <div>
//         <p className={style.input_lable}>PASSWORD</p>
//         <input type="password" className={style.input} />
//       </div>

//       <p className={style.forgote_password}>FORGOT PASSWORD !</p>

//       <div className={style.btns_container}>
//         <button className={style.singin_up_btn}>LOGIN</button>
//         <NavLink to="/crete-account">
//           <button className={style.login_btn}>SIGN UP</button>
//         </NavLink>
//       </div>
//     </div>
//   </div>
// );
// }

// export default LoginPage;
import React, { useEffect, useState } from "react";
import style from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  PostCartForLocalStoreditems,
  PostCartnew,
  UserLogin,
} from "../../../Apis/UserApi";
import ForgotPassword from "../../../components/User/ForgotPassword/ForgotPassword";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    UserLogin(userData)
      .then((response) => {
        console.log("response:", response.data.user);
        if (response.data && response.data.UserjwtToken) {
          localStorage.setItem("UserToken", response.data.UserjwtToken);
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Update local storage
          const storedCart = JSON.parse(localStorage.getItem("cart"));
          if (storedCart) {
            console.log("storedCart login:", storedCart);

            const LocalCartProduct = {
              products: storedCart.map((item) => ({
                productID: item._id,
                quantity: item.quantity,
              })),
            };

            console.log("LocalCartProduct", LocalCartProduct);
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              const cartData = {
                userID: user._id,
                LocalCartProduct,
              };
              PostCartForLocalStoreditems(cartData).then((response) => {
                console.log(
                  "logged user LocalCartProduct response:",
                  response.status
                );
                if (response.status === 200) {
                  localStorage.removeItem("cart");
                  Navigate("/checkout");
                }
              });
            }

            Navigate("/cart");
          } else {
            Navigate("/");
          }
        } else {
          // Handle the case where the response does not contain a user token.
          // You might want to show an error message to the user.
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(error.response.data.message);
        // Handle errors, e.g., display an error message to the user.
      });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [forgotPass, setForgotPass] = useState(false);

  const handleForgotPass = () => {
    setForgotPass(true);
  };

  return (
    <>
      <div className={style.create_account_container}>
        {forgotPass ? (
          <ForgotPassword />
        ) : (
          <>
            <p className={style.heading}>
              LOGIN TO <span className={style.heading_span}>ACCOUNT</span>
            </p>

            <div className={style.from_cotainer}>
              <div>
                <p className={style.input_lable}>EMAIL</p>
                <input
                  type="email"
                  className={style.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className={style.input_lable}>PASSWORD</p>
                <input
                  type="password"
                  className={style.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className={style.forgote_password} onClick={handleForgotPass}>
                FORGOT PASSWORD !
              </p>

              <p className={style.error}>{error}</p>

              <div className={style.btns_container}>
                <button className={style.singin_up_btn} onClick={handleLogin}>
                  LOGIN
                </button>

                <NavLink to="/crete-account">
                  <button className={style.login_btn}>SIGN UP</button>
                </NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;

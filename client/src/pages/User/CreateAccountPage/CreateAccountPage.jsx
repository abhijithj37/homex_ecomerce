// import React, { useEffect } from "react";
// import style from "./CreateAccountPage.module.css";
// import { NavLink } from "react-router-dom";

// function CreateAccountPage() {
//     useEffect(() => {
//         // Scroll to the top of the page when the component mounts
//         window.scrollTo(0, 0);
//       }, []);
//   return (
//     <div className={style.create_account_container}>
//       <p className={style.heading}>
//         CREATE <span className={style.heading_span}>ACCOUNT</span>
//       </p>

//       <div className={style.from_cotainer}>
//         <div>
//           <p className={style.input_lable}>FIRST NAME</p>
//           <input type="text" className={style.input} />
//         </div>

//         <div>
//           <p className={style.input_lable}>LASR NAME</p>
//           <input type="text" className={style.input} />
//         </div>

//         <div>
//           <p className={style.input_lable}>EMAIL</p>
//           <input type="text" className={style.input} />
//         </div>
//         <p className={style.input_lable}>PASSWORD</p>
//         <input type="text" className={style.input} />

//         <div>
//           <p className={style.input_lable}>RE-TYPE PASSWORD</p>
//           <input type="text" className={style.input} />
//         </div>

//         <div className={style.btns_container}>
//           <button className={style.singin_up_btn}>SIGN UP</button>

//            <NavLink to="/login">
//            <button className={style.login_btn}>LOGIN</button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateAccountPage;
import React, { useEffect, useState } from "react";
import style from "./CreateAccountPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccountPage() {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("formData:", formData);

    if (formData.password !== formData.retypePassword) {
      // Passwords don't match, handle the validation error
      // You can display an error message to the user or take any other appropriate action
      alert("Passwords do not match.");
    } else {
      // Passwords match, proceed with the POST request
      // Make a POST request to the server with formData
      // Replace 'your-api-endpoint' with your actual server endpoint
      axios
        .post("http://localhost:8000/register-user", formData)
        .then((response) => {
          console.log("response:", response.data.userDetails.UserjwtToken);

          // localStorage.setItem(
          //   "UserToken",
          //   response.data.userDetails.UserjwtToken
          // );

          Navigate("/login");
          // Handle the response (e.g., redirect, show a success message, etc.)
        })
        .catch((error) => {
          console.log("error", error);
          // Handle any errors (e.g., show an error message)
        });
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={style.create_account_container}>
      <p className={style.heading}>
        CREATE <span className={style.heading_span}>ACCOUNT</span>
      </p>

      <form className={style.from_cotainer} onSubmit={handleSubmit}>
        <div>
          <p className={style.input_lable}>USER NAME</p>
          <input
            type="text"
            className={style.input}
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className={style.input_lable}>EMAIL</p>
          <input
            type="text"
            className={style.input}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <p className={style.input_lable}>PASSWORD</p>
        <input
          type="password"
          className={style.input}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div>
          <p className={style.input_lable}>RE-TYPE PASSWORD</p>
          <input
            type="password"
            className={style.input}
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
          />
        </div>

        <div className={style.btns_container}>
          <button type="submit" className={style.singin_up_btn}>
            SIGN UP
          </button>

          <NavLink to="/login">
            <button className={style.login_btn}>LOGIN</button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountPage;

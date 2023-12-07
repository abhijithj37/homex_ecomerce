// import { NavLink } from "react-router-dom";
// import "./navbar.css";
// import homexLogo from "../../../assets/Logos/HomexLogo.png";
// import AccountIcon from "../../../assets/Icons/Account.svg";
// import CartIcon from "../../../assets/Icons/CartIcon.svg";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { useEffect, useState } from "react";
// import { useCart } from "../../../Context/CartContext/CartContext";
// import GoogleTransiltor from "./GoogleTransiltor/GoogleTransiltor";
// import useUserCart from "../../../Store/CartStore";
// import CustomDropdown from "./CustomDropdown";

// function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { currentUserCart } = useUserCart();

//   const [langauge, setLanguage] = useState(false);

//   const toggleLanguage = () => {
//     setLanguage(!langauge);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <>
//       <div className="navbar_wrapper">
//         <AiOutlineMenu
//           className="menu_icon"
//           size={24}
//           onClick={toggleMobileMenu}
//         />

//         <div className="homex_logo_div">
//           <NavLink to="/">
//             <img src={homexLogo} alt="Homex logo" />
//           </NavLink>
//         </div>

//         <div className="navbar_links_div">
//           <div className="navbar_links">
//             {/* <GoogleTransiltor /> */}

//             <button className="language_btn" onClick={toggleLanguage}>
//               Language
//             </button>
//             {langauge && <GoogleTransiltor />}
//             <NavLink to="/"> HOME </NavLink>
//             <NavLink to="/products"> PRODUCTS </NavLink>
//             <NavLink to="/Blog"> BlOG </NavLink>
//             <NavLink to="/featured"> FEATURED </NavLink>
//           </div>
//           <div className="navbar_icons_div">
//             <NavLink to="/my-account">
//               <img className="AccountIcon" src={AccountIcon} />
//             </NavLink>

//             <div className="cartIcon_div">
//               <NavLink to="/cart">
//                 <img className="CartIcon" src={CartIcon} />
//               </NavLink>
//               <p>({currentUserCart.length})</p>
//             </div>
//           </div>
//         </div>

//         <div className="cartIcon_div_mobile">
//           <NavLink to="/cart">
//             <img className="CartIcon" src={CartIcon} />
//           </NavLink>
//           <p>({currentUserCart.length})</p>
//         </div>

//         {mobileMenuOpen ? (
//           <div className="mobile_overlay" onClick={toggleMobileMenu}>
//             <div className="sidebar">
//               {/*
//             <button className="language_btn" onClick={toggleLanguage}>Language</button>
//             {langauge&&<GoogleTransiltor />} */}
//               <GoogleTransiltor />

//               <AiOutlineClose
//                 className="close_btn"
//                 onClick={toggleMobileMenu}
//               />

//               <div className="mobile_sidebar_links_container">
//                 <NavLink onClick={toggleMobileMenu} to="/">
//                   {" "}
//                   <p className="mobile_sidebar_links">HOME</p>{" "}
//                 </NavLink>
//                 <NavLink onClick={toggleMobileMenu} to="/products">
//                   {" "}
//                   <p className="mobile_sidebar_links">PRODUCTS</p>{" "}
//                 </NavLink>

//                 <NavLink onClick={toggleMobileMenu} to="/Blog">
//                   {" "}
//                   <p className="mobile_sidebar_links">BlOG</p>{" "}
//                 </NavLink>

//                 <NavLink onClick={toggleMobileMenu} to="/featured">
//                   {" "}
//                   <p className="mobile_sidebar_links">FEATURED</p>{" "}
//                 </NavLink>
//                 <NavLink onClick={toggleMobileMenu} to="/my-account">
//                   {" "}
//                   <p className="mobile_sidebar_links">ACCOUNT</p>{" "}
//                 </NavLink>
//                 <NavLink onClick={toggleMobileMenu} to="/cart">
//                   {" "}
//                   <p className="mobile_sidebar_links">CART</p>{" "}
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </>
//   );
// }

// export default Navbar;

import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import homexLogo from "../../../assets/Logos/HomexLogo.png";
import AccountIcon from "../../../assets/Icons/Account.svg";
import CartIcon from "../../../assets/Icons/CartIcon.svg";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useCart } from "../../../Context/CartContext/CartContext";
import GoogleTransiltor from "./GoogleTransiltor/GoogleTransiltor";
import useUserCart from "../../../Store/CartStore";
import CustomDropdown from "./CustomDropdown";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUserCart } = useUserCart();
  const location = useLocation(); // useLocation hook to get the current route

  const [langauge, setLanguage] = useState(false);

  const toggleLanguage = () => {
    setLanguage(!langauge);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className={styles.navbar_wrapper}>
        <AiOutlineMenu
          className={styles.menu_icon}
          size={24}
          onClick={toggleMobileMenu}
        />

        <div className={styles.homex_logo_div}>
          <NavLink to="/">
            <img src={homexLogo} alt="Homex logo" />
          </NavLink>
        </div>

        <div className={styles.navbar_links_div}>
          <div className={styles.navbar_links}>
            <div className={styles.navbar_wrapper}>
              <div className={styles.navbar_links}>
                <button
                  className={styles.language_btn}
                  onClick={toggleLanguage}
                >
                  Language
                </button>
                    {langauge && <GoogleTransiltor />}
                    <NavLink to="/" className={location.pathname === '/' ? styles["active-link"] : ''} exact>
                      HOME
                    </NavLink>
                    <NavLink to="/products" className={location.pathname === '/products' ? styles["active-link"] : ''}>
                      PRODUCTS
                    </NavLink>
                    <NavLink to="/Blog" className={location.pathname === '/Blog' ? styles["active-link"] : ''}>
                      BlOG
                    </NavLink>
                    <NavLink to="/featured" className={location.pathname === '/featured' ? styles["active-link"] : ''}>
                      FEATURED
                    </NavLink>
              </div>
            </div>
          </div>
          <div className={styles.navbar_icons_div}>
            <NavLink to="/my-account" activeClassName={styles["active-link"]}>
              <img className={styles.AccountIcon} src={AccountIcon} />
            </NavLink>

            <div className={styles.cartIcon_div}>
              <NavLink to="/cart" activeClassName={styles["active-link"]}>
                <img className={styles.CartIcon} src={CartIcon} />
              </NavLink>
              <p>({currentUserCart.length})</p>
            </div>
          </div>
        </div>

        <div className={styles.cartIcon_div_mobile}>
          <NavLink to="/cart" activeClassName={styles["active-link"]}>
            <img className={styles.CartIcon} src={CartIcon} />
          </NavLink>
          <p>({currentUserCart.length})</p>
        </div>

        {mobileMenuOpen ? (
          <div className={styles.mobile_overlay} onClick={toggleMobileMenu}>
            <div className={styles.sidebar}>
              <GoogleTransiltor />

              <AiOutlineClose
                className={styles.close_btn}
                onClick={toggleMobileMenu}
              />

              <div className={styles.mobile_sidebar_links_container}>
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/"
                  activeClassName={styles["active-link"]}
                  exact
                >
                  <p className={styles.mobile_sidebar_links}>HOME</p>
                </NavLink>
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/products"
                  activeClassName={styles["active-link"]}
                >
                  <p className={styles.mobile_sidebar_links}>PRODUCTS</p>
                </NavLink>

                <NavLink
                  onClick={toggleMobileMenu}
                  to="/Blog"
                  activeClassName={styles["active-link"]}
                >
                  <p className={styles.mobile_sidebar_links}>BlOG</p>
                </NavLink>

                <NavLink
                  onClick={toggleMobileMenu}
                  to="/featured"
                  activeClassName={styles["active-link"]}
                >
                  <p className={styles.mobile_sidebar_links}>FEATURED</p>
                </NavLink>
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/my-account"
                  activeClassName={styles["active-link"]}
                >
                  <p className={styles.mobile_sidebar_links}>ACCOUNT</p>
                </NavLink>
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/cart"
                  activeClassName={styles["active-link"]}
                >
                  <p className={styles.mobile_sidebar_links}>CART</p>
                </NavLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Navbar;

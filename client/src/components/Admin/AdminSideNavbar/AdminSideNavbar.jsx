import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./AdminSideNavbar.css";
// import Swal from "sweetalert2";
import logo from "../../../assets/Logos/HomexLogo.png";
import {
  FaBars,
  FaCommentAlt,
  FaHourglassStart,
  FaRegChartBar,
  FaRegNewspaper,
  FaShoppingBag,
  FaTh,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import {
  AiFillCheckSquare,
  AiFillEdit,
  AiOutlineBlock,
  AiOutlineCalendar,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import {
  MdPendingActions,
  MdOutlineCancelPresentation,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { BsNewspaper, BsPersonVideo3 } from "react-icons/bs";

import { Button, message, Popconfirm } from "antd";

function AdminSideNavbar() {
  const Navigate = useNavigate();

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
    localStorage.removeItem("AdminToken");
    Navigate("/admin-login");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isMobile, setIsMobile] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // console.log("width..", width);

  useEffect(() => {
    if (width < 700) {
      console.log("mobile");

      toggle(true);
      setIsOpen(isOpen);
    } else {
      console.log("desktop");
      toggle();
    }
  }, [width]);

  const [MenuItems, SetmenuItems] = useState([
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/order",
      name: "Order",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/product-details",
      name: "Products",
      icon: <MdProductionQuantityLimits />,
    },
    {
      path: "/admin/catagory-details",
      name: "Catagory",
      icon: <AiOutlineBlock />,
    },
    {
      path: "/admin/users-details",
      name: "Users",
      // disabled: true,

      icon: <FaUsers />,
    },
    {
      path: "/admin/banner-details",
      name: "Banner",
      // disabled: true,

      icon: <FaRegNewspaper />,
    },

    {
      path: "/admin/blog-details",
      name: "Blog",
      // disabled: true,
      icon: <BsNewspaper />,
    },
    // {
    //   path: "/admin/about-us",
    //   name: "About-us ",
    //   disabled: true,
    //   icon: <BsPersonVideo3 />,
    // },
  ]);
  const [selectedCatagory, setSelectedCatagory] = useState("Applications");

  return (
    <div style={{ width: isOpen ? `300px` : `50px` }} className="sidebarr">
      <div className="top_section">
        <div style={{ display: isOpen ? "block" : "none" }} className="logo">
          <img src={logo} alt="" />
        </div>
        <div style={{ marginLeft: isOpen ? "200px" : "0px" }} className="bars">
          <FaBars onClick={toggle} />
        </div>
      </div>
      {MenuItems.map((item, index) => (
        // <NavLink
        //   to={item.path}
        //   key={index}
        //   className="link"
        //   activeClassName="link-active"
        //   style={{
        //     background: item.name === selectedCatagory && "rgb(78, 151, 240)",
        //     color: "white",
        //   }}
        //   onClick={() => {
        //     setSelectedCatagory(item.name);
        //     setIsOpen(false);
        //   }}
        // >
        //   <div className="sidebar_menu_link_container">
        //     <div className="icon">{item.icon}</div>
        //     <div
        //       style={{ display: isOpen ? "block" : "none" }}
        //       className="link_text"
        //     >
        //       {item.name}
        //     </div>
        //   </div>
        // </NavLink>

        <NavLink
          to={item.path}
          key={index}
          className="link"
          activeClassName="link-active"
          style={{
            background: item.disabled
              ? "#e6e6e6"
              : item.name === selectedCatagory && "rgb(78, 151, 240)",
            color: item.disabled ? "white" : "black",
            pointerEvents: item.disabled ? "none" : "auto",
          }}
          onClick={() => {
            setSelectedCatagory(item.name);
            setIsOpen(false);
          }}
        >
          <div className="sidebar_menu_link_container">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </div>
        </NavLink>
      ))}

      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        style={{ zIndex: 122100, position: "absolute" }}
      >
        {/* <Button danger>Delete</Button> */}

        <button className={isOpen ? "logout_btn_false" : "logout_btn_true"}>
          logout
        </button>
      </Popconfirm>
    </div>
  );
}

export default AdminSideNavbar;

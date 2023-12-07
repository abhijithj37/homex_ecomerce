import React, { useEffect } from "react";
import style from "./SingleBlogPage.module.css";
import { NavLink, useLocation } from "react-router-dom";
import BlogCard from "../../../components/User/BlogCard/BlogCard";
import blogImage1 from "../../../assets/images/Rectangle 18 (1).png";
import blogImage2 from "../../../assets/images/Rectangle 18.png";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function SingleBlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { blog } = location.state;
  return (
    <div>
      <div className={style.blog_card_contaier}>
        {/* <p className={style.heading}>
          <span className={style.heading_span}>BLOG</span>
        </p> */}
        <div className={style.blog}>
          <p className={style.blog_heading}>
          {blog?.heading}
          </p>
          <div className={style.blog_image_container}>
          <img src={baseUrl + "/images/" + blog?.image} alt="" />
            <div className={style.blog_date}>   {new Date(blog?.date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}</div>
          </div>
          <p className={style.blog_dicri}>
          {blog?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;

import React from "react";
import style from "./BloagCard.module.css";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function BlogCard({ image, latest, blog }) {
  const slicedDescription =
    blog?.description && blog?.description.length > 1
      ? blog?.description.slice(0, 254)
      : blog?.description;

  return (
    <div
      className={
        latest ? style.blog_card_contaier_homeScreen : style.blog_card_contaier
      }
    >
      <div className={style.blog_image_container}>
        {/* <img src={image} alt="" /> */}
        <Link to="/single-blog" state={{ blog: blog }}>
          <img src={baseUrl + "/images/" + blog?.image} alt="" />
        </Link>

        <div className={style.blog_date}>
          {new Date(blog?.date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <p className={style.blog_heading}>{blog?.heading}</p>
      <p className={style.blog_dicri}>{slicedDescription}</p>
      <Link to="/single-blog" state={{ blog: blog }}>
        <p className={style.blog_readmore}>READ MORE</p>
      </Link>
    </div>
  );
}

export default BlogCard;

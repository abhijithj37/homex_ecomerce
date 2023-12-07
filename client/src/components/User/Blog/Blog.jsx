import React, { useEffect, useState } from "react";
import style from "./Blog.module.css";
import BlogCard from "../BlogCard/BlogCard";
import blogImage1 from "../../../assets/images/Rectangle 18 (1).png"
import blogImage2 from "../../../assets/images/Rectangle 18.png"
import { AllBlogs } from "../../../Apis/UserApi";
import { useNavigate } from 'react-router-dom';

function Blog() {
  let latest=true


  const [blogData, setBlogData] = useState([]);

  const fetchBlogs = () => {
    AllBlogs()
      .then((blogs) => {
        // Get only the first 4 blogs
        const firstFourBlogs = blogs.data.slice(0, 2);
        setBlogData(firstFourBlogs);
        console.log("blogs", blogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };
  
  console.log("blogData:", blogData);
  
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div className={style.blog_cotainer}>
      <p className={style.blog_text}>
        <span className={style.latest}>LATEST</span> BLOG
      </p>
      <div className={style.blog_card_container}>
        {blogData.map((blog)=>{
          return(
            <BlogCard image={blogImage1} latest={latest} blog={blog}/>

          )
        })}
      </div>
    </div>
  );
}

export default Blog;

import React, { useEffect, useState } from "react";
import style from "./BlogPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import BlogCard from "../../../components/User/BlogCard/BlogCard";
import blogImage1 from "../../../assets/images/Rectangle 18 (1).png";
import blogImage2 from "../../../assets/images/Rectangle 18.png";
import image3 from "../../../assets/images/Screenshot__452_-removebg-preview.png";
import image4 from "../../../assets/images/Screenshot__451_-removebg-preview.png";
import { AllBlogs } from "../../../Apis/UserApi";

let blogs = [blogImage1, blogImage2,image4 ,blogImage1,image3,blogImage2];

function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/single-blog");
  };


  const [blogData, setBlogData] = useState([]);

  const fetchBlogs = () => {
    AllBlogs()
      .then((blogs) => {
        // Get only the first 4 blogs
        setBlogData( blogs.data);
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

  return (
    <div>
    <div className={style.create_account_container}>
      <p className={style.heading}>
        OUR <span className={style.heading_span}>BLOGS</span>
      </p>
      <div className={style.blogs_cotainer}>
        {/* {blogs.map((image, index) => (
          <div key={index} onClick={handleClick} className={style.blo}>
            <BlogCard image={image} />
          </div>
        ))} */}
         {blogData.map((blog)=>{
          return(
            <BlogCard blog={blog}/>

          )
        })}
      </div>
    </div>
  </div>
  );
}

export default BlogPage;

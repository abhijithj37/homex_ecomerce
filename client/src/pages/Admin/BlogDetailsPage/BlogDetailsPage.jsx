import React from "react";
import style from "./BlogDetailsPage.module.css";
import BlogTable from "../../../components/Admin/BlogTable/BlogTable";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
function BlogDetailsPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/post-new-blog");
  };

  return (
    <div>
      <div className={style.head_container}>
        <div className={style.head_text}>Blogs</div>
      </div>
      <Button type="primary" onClick={handleClick}>
        Post new blog
      </Button>
      <div className={style.table_cotaienr}>
        <BlogTable />
      </div>
    </div>
  );
}

export default BlogDetailsPage;

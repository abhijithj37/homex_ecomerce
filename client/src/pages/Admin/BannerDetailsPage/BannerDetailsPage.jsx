import React from "react";
import ProductsTable from "../../../components/Admin/ProductsTable/ProductsTable";
import { useNavigate } from "react-router-dom";
import style from "./BannerDetailsPage.module.css";

import BannerForm from "../../../components/Admin/BannerFormCard/BannerFormCard";
import { Button } from "antd";
import BannerTable from "./BannerTable/BannerTable";

function BannerDetailsPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/new-banner");
  };

  return (
    <div>
      <div>
        <div className={style.head_container}>
          <div className={style.head_text}>Banner control</div>
        </div>
        <Button type="primary" onClick={handleClick}>
          Create new banner
        </Button>
        <div className={style.table_cotaienr}>
          <BannerTable />
        </div>
      </div>

     
    </div>
  );
}

export default BannerDetailsPage;

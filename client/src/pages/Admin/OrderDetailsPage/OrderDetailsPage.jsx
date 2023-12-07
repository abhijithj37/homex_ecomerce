import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OrderDetailsPage.module.css";
import { GetAllOrders, GetAllproduct } from "../../../Apis/AdminApi";
import OrderTable from "../../../components/Admin/OrderTable/OrderTable";

function OrderDetailsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    GetAllOrders()
      .then((ordersData) => {
        setOrders(ordersData.data);
        console.log("Orders", ordersData.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={style.ProductsDetailsPage_wrapper}>
      <div className={style.head_container}>
        <div className={style.head_text}>All Orders</div>
      </div>

      <div className={style.ProductsDetailsPage}>
        <OrderTable orders={orders} fetchOrders={fetchOrders} />
      </div>
    </div>
  );
}

export default OrderDetailsPage;

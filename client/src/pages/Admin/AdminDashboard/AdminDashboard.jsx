import React, { useEffect, useState } from "react";
import style from "./AdminDashboard.module.css";
import OrderTable from "../../../components/Admin/OrderTable/OrderTable";
import {
  GetAllOrders,
  GetAllVisitors,
  GetAllproduct,
  GetOrderByitStatus,
  GetPlacedOrder,
} from "../../../Apis/AdminApi";
import { Link } from "react-router-dom";

function AdminDashboard() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]); // Corrected state name
  const [shippedOrders, setShippedOrders] = useState([]); // Corrected state name
  const [totalOrders, setTotalOrders] = useState("");

  const [products, setProducts] = useState([]);
  const [visitor, setVisitor] = useState();

  const fetchProducts = () => {
    GetAllproduct()
      .then((products) => {
        setProducts(products.data);
        // console.log("products", products);
      })
      .catch((error) => {
        handleFetchError(error);
      });
  };

  const fetchVistors = () => {
    GetAllVisitors()
      .then((visitor) => {
        setVisitor(visitor.data);
        console.log("visitor", visitor);
      })
      .catch((error) => {
        handleFetchError(error);
      });
  };

  const fetchOrders = async () => {
    try {
      const placedOrdersData = await GetPlacedOrder();
      setOrders(placedOrdersData.data);
      const shippedOrdersData = await GetOrderByitStatus("shipped");
      setShippedOrders(shippedOrdersData.data);
      const deliveredOrdersData = await GetOrderByitStatus("delivered");
      setDeliveredOrders(deliveredOrdersData.data);
    } catch (error) {
      handleFetchError(error);
    }
  };

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 403) {
      // Redirect to admin login page when a 403 status/tpken expire is received
      window.location.href = "http://127.0.0.1:5173/admin-login";
    } else {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchVistors();
  }, []);

  useEffect(() => {
    const totalOrder =
      orders.length + shippedOrders.length + deliveredOrders.length;
    setTotalOrders(totalOrder);
  }, [orders, shippedOrders, deliveredOrders]); //

  let dashboard = true;

  return (
    <div className={style.dashboar}>
      <div className={style.head_container_main}>
        <div className={style.head_text}>Homex Admin Dashboard</div>
      </div>

      <div className={style.dashboar_conten}>
        <p className={style.overview}>Order Overview</p>
        <div className={style.overview_wrap}>
          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Order</p>
              <Link to={"/admin/order"} className={style.link}>
                <p>View orders</p>
              </Link>{" "}
            </div>
            <p className={style.count}>{orders?.length}</p>
          </div>

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Shipped orders</p>
              <Link to={"/admin/order"} className={style.link}>
                <p>View orders</p>
              </Link>{" "}
            </div>
            <p className={style.count}>{shippedOrders?.length}</p>
          </div>

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Deliverd</p>
              <Link to={"/admin/order"} className={style.link}>
                <p>View orders</p>
              </Link>
            </div>
            <p className={style.count}>{deliveredOrders?.length}</p>
          </div>
        </div>
      </div>

      <div className={style.dashboar_conten}>
        <p className={style.overview}>Homex Overview</p>
        <div className={style.overview_wrap}>

          {/* <div className={style.overview_card}>
            <div className={style.head_container}>
              <p className={style.link}>Total site visitors</p>
             
            </div>
            <p className={style.count}>{visitor?.length}</p>
          </div> */}

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p className={style.link}>Total catagory</p>
             
            </div>
            <p className={style.count}>0</p>
          </div>

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Total orders</p>
              <Link to={"/admin/order"} className={style.link}>
                <p>View orders</p>
              </Link>{" "}
            </div>
            <p className={style.count}>{totalOrders}</p>
          </div>

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Total product</p>
              <Link to={"/admin/product-details"} className={style.link}>
                <p>View products</p>
              </Link>{" "}
            </div>
            <p className={style.count}>{products?.length}</p>
          </div>

          <div className={style.overview_card}>
            <div className={style.head_container}>
              <p>Total users</p>
              <Link to={"/admin/users-details"} className={style.link}>
                <p>View user</p>
              </Link>
            </div>
            <p className={style.count}>0</p>
          </div>
        </div>
      </div>

      <div>
        <div className={style.head_container_main}>
          <div className={style.head_text}>All latest placed orders</div>
        </div>

        <OrderTable
          orders={orders}
          fetchOrders={fetchOrders}
          dashboard={dashboard}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;

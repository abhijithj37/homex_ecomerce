import React, { useEffect, useState } from "react";
import style from "./MyAccountPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GetSingleProduct, GetUserPlacedOrder } from "../../../Apis/UserApi";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
import { Tag } from "antd";

function MyAccountPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const Navigate = useNavigate();

  const OrderStatusTag = ({ status }) => {
    // Define colors for different statuses
    const colors = {
      placed: "green",
      shipped: "blue",
      delivered: "purple",
    };

    return <Tag color={colors[status]}>{status}</Tag>;
  };

  const logoutHandle = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    Navigate("/login");
  };
  let userId = user?._id;
  const [order, setOrder] = useState([]);
  const fetchOrder = () => {
    GetUserPlacedOrder(userId).then((response) => {
      setOrder(response.data);
    });
  };

  console.log("order:", order);

  useEffect(() => {
    fetchOrder();
  }, []);

  const [productDetails, setProductDetails] = useState([]);

  console.log("productDetails:", productDetails);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const detailsPromises = order.flatMap((order) =>
        order.products.map((product) => GetSingleProduct(product.productID))
      );

      const productDetailsArray = await Promise.all(detailsPromises);
      setProductDetails(productDetailsArray);

      console.log("Product Details:", productDetailsArray);
    };

    fetchProductDetails();
  }, [order]);

  return (
    <div className={style.account_contiaer}>
      <p className={style.heading}>
        MY <span className={style.heading_span}>ACCOUNT</span>
        <div className={style.account_detail_container}>
          <div className={style.account_details}>
            <p className={style.account_details_head}>USER</p>
            <p className={style.account_details_disc}>
              User Name:{user ? user.username : ""}
            </p>
            <p className={style.account_details_disc}>
              Email Address:{user ? user.email : ""}
            </p>
          </div>

          <div className={style.account_details}>
            <p className={style.account_details_head}>ORDERS</p>
            {order.length < 1 ? (
              <p className={style.account_details_disc}>
                You haven't placed any orders yet.
              </p>
            ) : (
              <div className={style.orders_list}>
                {order.map((order) => (
                  <>
                    <div key={order._id} className={style.order_item}>
                      <p className={style.order_details}>
                        Ordered Date:{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <p className={style.order_details}>
                        Order id: {order._id}
                      </p>
                      <p className={style.order_details}>
                        Email: {order.email}
                      </p>
                      <p className={style.order_details}>
                        {/* Status: <span style={{color:"blue"}}> {order.orderStatus}</span> */}
                        <p>
                          Status: <OrderStatusTag status={order.orderStatus} />
                        </p>
                      </p>
                      <p className={style.order_details}>Address:</p>
                      <p className={style.order_details}>
                        {order.address.street}, {order.address.apartment},{" "}
                        {order.address.city}, {order.address.state}{" "}
                        {order.address.zip}, {order.address.country}
                      </p>
                      <p className={style.order_details}>Products:</p>
                      {order.products.map((product, index) => (
                        <div
                          key={product.productID}
                          className={style.product_item}
                        >
                          <p className={style.order_details}>
                            Product:{" "}
                            {product.name.length > 30
                              ? product.name.substring(0, 20) + "..."
                              : product.name}
                          </p>
                          <p className={style.order_details}>
                            Qty: {product.quantity}
                          </p>
                          <p className={style.order_details}>
                            Price: {product.unitPrice}
                          </p>
                          {productDetails.length > 0 &&
                            productDetails[index]?.data?.images?.length > 0 && (
                              <div>
                                <img
                                  src={
                                    baseUrl +
                                    "/images/" +
                                    productDetails[index].data.images[0]?.img
                                  }
                                  alt={`Product ${index + 1}`}
                                  className={style.product_image}
                                />
                              </div>
                            )}
                          <hr />
                        </div>
                      ))}
                      <p className={style.order_details_total}>
                        Order total: {order.orderTotal} OMR
                      </p>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <p className={style.logout_btn} onClick={logoutHandle}>
              LOG-OUT
            </p>
          ) : (
            <NavLink to={"/login"}>
              <p className={style.logout_btn}>LOGIN TO ACCOUNT</p>
            </NavLink>
          )}
        </div>
      </p>
    </div>
  );
}

export default MyAccountPage;

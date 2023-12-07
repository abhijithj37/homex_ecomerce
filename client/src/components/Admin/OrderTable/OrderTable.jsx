import React, { useState } from "react";
import style from "./OrderTable.module.css";
import {
  DeleteOrder,
  DeleteProduct,
  UpdateOrderStatus,
} from "../../../Apis/AdminApi";
import {
  Button,
  Table,
  message,
  Tag,
  Input,
  DatePicker,
  Space,
  Popconfirm,
  Modal,
} from "antd";

const { Search } = Input;
const { RangePicker } = DatePicker;

function OrderTable({ orders, fetchOrders ,dashboard}) {
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); // Default status
  const [selectedOrdersStatus, setSelectedOrdersStatus] = useState({});

  const handleUpdateStatus = (orderId) => {
    const newStatus = selectedOrdersStatus[orderId] || "placed";

    // Call the API to update the status
    UpdateOrderStatus({ orderId, newStatus })
      .then((updateOrderResponse) => {
        console.log("updateOrderResponse:", updateOrderResponse);
        if (updateOrderResponse.status === 200) {
          // message.success(
          //   "Order status updated successfully",
          //   updateOrderResponse.data.message
          // );
          fetchOrders();
        }

        // Reset selected values
        setSelectedOrdersStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: undefined, // Reset to undefined for default value
        }));
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        message.error("Failed to update order status");
      });
  };

  const updateStatusColumn = {
    title: "Update Order Status",
    dataIndex: "updateStatus",
    key: "updateStatus",
    render: (_, record) => (
      <Space size="middle">
        {/* Use a dropdown for status selection */}
        <select
          className={style.select}
          value={selectedOrdersStatus[record._id] || record.orderStatus}
          onChange={(e) =>
            setSelectedOrdersStatus((prevStatus) => ({
              ...prevStatus,
              [record._id]: e.target.value,
            }))
          }
        >
          {["placed", "shipped", "delivered", "cancelled", "notcompleted"].map(
            (status) => (
              <option className={style.option} key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            )
          )}
        </select>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: "Confirm Status Update",
              content: `Are you sure you want to update the order status to "${
                selectedOrdersStatus[record._id] || "shipped"
              }"?`,
              okText: "Yes",
              cancelText: "No",
              onOk() {
                try {
                  handleUpdateStatus(record._id);
                } catch (error) {
                  console.error("Error updating order status:", error);
                  message.error("Failed to update order status");
                }
              },
              onCancel() {
                console.log("Status update canceled");
              },
            });
          }}
        >
          Update Status
        </Button>
      </Space>
    ),
  };

  const handleSearch = (value) => {
    const filteredData = orders.filter((order) => {
      const searchRegex = new RegExp(value, "i");
      const addressString = `${order.address.street}, ${order.address.apartment}, ${order.address.city}, ${order.address.state}, ${order.address.zip}, ${order.address.country}`;

      return (
        searchRegex.test(order._id) ||
        searchRegex.test(order.address.name) ||
        searchRegex.test(order.email) ||
        searchRegex.test(order.phoneNumber) ||
        searchRegex.test(order.orderStatus) ||
        searchRegex.test(String(order.orderTotal)) ||
        searchRegex.test(addressString)
      );
    });

    setSearchText(value);
    setFilteredOrders(filteredData);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const handleResetSearch = () => {
    setSearchText("");
    setFilteredOrders(null);
  };
  const handleDateFilterChange = (dates) => {
    setDateRange(dates);
    const filteredData = orders.filter((order) => {
      if (dates.length === 0) {
        return true; // No date filter applied
      }
      const createdAt = new Date(order.createdAt);
      return (
        createdAt >= dates[0].startOf("day") &&
        createdAt <= dates[1].endOf("day")
      );
    });
    setFilteredOrders(filteredData);
  };

  const handleButtonClick = (key) => {
    console.log(`Button clicked for row with key ${key}`);
  };

  // const handleDelete = async (record) => {
  //   console.log("record...", record._id);
  //   try {
  //     DeleteOrder(record._id).then((response) => {
  //       fetchOrders();
  //       console.log("response:", response);
  //       if (response.status === "200") {
  //         fetchOrders();
  //         message.success("Order deleted successfully", response);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //     message.error("Failed to delete order");
  //   }
  // };
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete this order?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Handle the deletion logic here
        // console.log("record...", record._id);
        try {
          DeleteOrder(record._id).then((response) => {
            fetchOrders();
            console.log("response:", response);
            if (response.status === "200") {
              fetchOrders();
              message.success("Order deleted successfully", response);
            }
          });
        } catch (error) {
          console.error("Error deleting order:", error);
          message.error("Failed to delete order");
        }
      },
      onCancel() {
        console.log("Deletion canceled");
      },
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },

    {
      title: "Order Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Space>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
            <Button
              type="primary"
              onClick={() => {
                confirm();
                handleDateFilterChange(dateRange);
              }}
            >
              Filter
            </Button>
            <Button onClick={clearFilters}>Reset</Button>
          </Space>
        </div>
      ),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setDateRange([]);
        }
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // Add filters for Email if needed
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      // Add filters for Phone Number if needed
    },

    
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag
          color={
            status === "notcompleted"
              ? "red"
              : status === "placed"
              ? "green"
              : status === "shipped"
              ? "blue"
              : status === "delivered"
              ? "purple"
              : status === "cancelled"
              ? "gray"
              : "yellow"
          }
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Not Completed", value: "notcompleted" },
        { text: "Placed", value: "placed" },
        { text: "Shipped", value: "shipped" },
        { text: "Delivered", value: "delivered" },
        { text: "Cancelled", value: "cancelled" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.orderStatus === value,
    },


    {
      title: "Order Value",
      dataIndex: "orderTotal",
      key: "orderTotal",
      sorter: (a, b) => a.orderTotal - b.orderTotal,
      sortOrder: sortedInfo.columnKey === "orderTotal" && sortedInfo.order,
      render: (orderTotal) => (
        <span style={{ fontWeight: "bold" }}>{orderTotal}</span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <span>{`${address.street}, ${address.apartment}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`}</span>
      ),
      filters: [
        { text: "usa", value: "usa" },
        { text: "india", value: "india" }, // Add more countries as needed
        { text: "oman", value: "oman" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => {
        // Implement filtering logic for Address if needed
        return record.address.country === value;
      },
    },
    updateStatusColumn,
    {
      title: "Delete",
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];
  const expandedColumns = [
    {
      title: "Product id",
      dataIndex: "productID",
      key: "productID",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Product Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
  ];

  const expandedRowRender = (record) => (
    <div className={style.expand_row}>
      <p>
        <span style={{ fontWeight: "bold", color: "red" }}>Order Value:</span>{" "}
        <span style={{ fontWeight: "bold" }}> {record.orderTotal}</span>
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Order ID:</span> {record._id}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>User ID:</span> {record.userID}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Address Details:</span>{" "}
        {`${record.address.street}, ${record.address.apartment}, ${record.address.city}, ${record.address.state}, ${record.address.zip}, ${record.address.country}`}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Customer Name:</span>{" "}
        {record.address.name}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Order Status:</span>{" "}
        <Tag
          color={
            record.orderStatus === "notcompleted"
              ? "red"
              : record.orderStatus === "placed"
              ? "green"
              : "yellow"
          }
        >
          {record.orderStatus}
        </Tag>
      </p>
      <p style={{ fontWeight: "500" }}>Product Details:</p>
      <Table
        columns={expandedColumns}
        dataSource={record.products}
        pagination={false}
      />
    </div>
  );

  return (
    <div className={ dashboard?"":style.table_container_order}>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search orders"
          enterButton="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ marginRight: 8, maxWidth: "400px" }}
        />
      </div>

      {/* <button onClick={handleUpdateOrderStatus}>update order status</button> */}

      <Button
        type="primary"
        onClick={handleResetSearch}
        style={{ marginBottom: "24px" }}
      >
        Reset
      </Button>
      <Table
      scroll={{ x: 500 }}
        style={{ fontWeight: "400" }}
        bordered
        columns={columns}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) =>
            !!record.products && record.products.length > 0,
        }}
        dataSource={filteredOrders || orders}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default OrderTable;

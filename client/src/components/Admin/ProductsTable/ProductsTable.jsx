// import { DeleteProduct } from "../../../Apis/AdminApi";
// import style from "./ProductsTable.module.css";
// import { Table, message, Button } from "antd";
// const { Column, ColumnGroup } = Table;
// function ProductsTable({ products,fetchProducts }) {

//   let url='http://localhost:8000'

//   const handleButtonClick = (key) => {
//     // Handle the button click here, e.g., open a modal, update data, etc.
//     console.log(`Button clicked for row with key ${key}`);
//   };

//   const handleDelete = async (record) => {
//     console.log("record...", record._id);
//     try {
//       await DeleteProduct(record._id);
//       message.success("product deleted successfully");
//       // fetchCategories defined in parent
//       fetchProducts()
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       // Display an error message when deletion fails
//       message.error("Failed to delete product");
//     }
//   };

//   const columns = [
//     {
//       title: "Product name",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Is Featured",
//       dataIndex: "isfeatured",
//       key: "isfeatured",
//       render: (isFeatured) => (
//         <span>{isFeatured ? "Yes" : "No"}</span>
//       ),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Image",
//       dataIndex: "images",
//       key: "images",
//       render: (images) => (
//         <img
//           src={url +"/images/" + images[0].img }
//           alt="Product Image"
//           style={{ width: "50px" }} // Adjust the width as needed
//         />
//       ),
//     },
//     {
//       title: "View more",
//       render: (text, record) => (
//         <Button type="primary" onClick={() => handleButtonClick(record.key)}>
//           View more
//         </Button>
//       ),
//     },
//     {
//       title: "Edit",
//       render: (text, record) => (
//         <Button type="primary" onClick={() => handleButtonClick(record.key)}>
//           Edit
//         </Button>
//       ),
//     },

//     {
//       title: "Delete",
//       render: (text, record) => (
//         <Button type="primary" danger onClick={() => handleDelete(record)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className={style.table_container}>
//         <Table bordered columns={columns} dataSource={products} />
//       </div>
//     </>
//   );
// }

// export default ProductsTable;

import { DeleteProduct } from "../../../Apis/AdminApi";
import style from "./ProductsTable.module.css";
import { Table, message, Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const { Column, ColumnGroup } = Table;
function ProductsTable({ products, fetchProducts }) {
  let url = baseURL;
  

  const handleButtonClick = (key) => {
    console.log(`Button clicked for row with key ${key}`);
  };
  // State to store the search text
  const [searchText, setSearchText] = useState("");

  // State to store the filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle search
  const handleSearch = (value) => {
    const searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(searchResults);
    setSearchText(value);
  };

  const handleResetSearch = () => {
    setSearchText("");
    setFilteredProducts([]);
  };

  const handleDelete = (record) => {
    const confirmDelete = () => {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this product?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          try {
            await DeleteProduct(record._id);
            message.success("Product deleted successfully");
            fetchProducts();
          } catch (error) {
            console.error("Error deleting product:", error);
            message.error("Failed to delete product");
          }
        },
      });
    };

    confirmDelete();
  };

  const columns = [
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        return (
          <span>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      title: "Product name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price, // Add sorter function for price
    },
    {
      title: "Is Featured",
      dataIndex: "isfeatured",
      key: "isfeatured",
      render: (isFeatured) => <span>{isFeatured ? "Yes" : "No"}</span>,
      filters: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      onFilter: (value, record) => record.isfeatured === value, // Add filter function for isfeatured
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={url + "/images/" + images[0].img}
          alt="Product Image"
          style={{ width: "50px" }} // Adjust the width as needed
        />
      ),
    },
    {
      title: "Edit",
      render: (text, record) => (
        <Link to="/admin/editform" state={{ product: record }}>
          <Button type="primary">{"Edit/Update"}</Button>
        </Link>
      ),
    },

    {
      title: "Delete",
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <div className={style.expand}>
      <p>
        <strong>Title:</strong> {record.title}
      </p>
      <p>
        <strong>Video Link:</strong> {record.videolink}
      </p>
      <p>
        <strong>Category:</strong> {record.category}
      </p>
      <p>
        <strong>Price:</strong> {record.price}
      </p>
      <p>
        <strong>Description:</strong> {record.description}
      </p>
      <p>
        <strong>Specification:</strong> {record.specification}
      </p>
      <p>
        <strong>Is Featured:</strong> {record.isfeatured ? "Yes" : "No"}
      </p>
      <p>
        <strong>Images:</strong>
      </p>
      <div style={{ display: "flex" }}>
        {record.images.map((image, index) => (
          <img
            key={index}
            src={url + "/images/" + image.img}
            alt={`Image ${index + 1}`}
            style={{ width: "50px", marginRight: "10px" }}
          />
        ))}
      </div>
    </div>
  );
  return (
    <>
      <div className={style.table_container}>
        {/* Search input */}
        <Input
          style={{ maxWidth: "400px", marginBottom: "30px" }}
          prefix={<SearchOutlined />}
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
        {searchText && (
          <Button
            type="link"
            onClick={handleResetSearch}
            style={{ marginBottom: "20px" }}
          >
            Clear Search
          </Button>
        )}

        {/* Table with expandable rows */}
        <Table
          style={{ fontWeight: "400" }}
          scroll={{ x: 500 }}
          bordered
          dataSource={searchText ? filteredProducts : products}
          columns={columns}
          expandable={{ expandedRowRender }}
        />
      </div>
    </>
  );
}

export default ProductsTable;

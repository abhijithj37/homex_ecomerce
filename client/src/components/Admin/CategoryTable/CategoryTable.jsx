import React, { useState } from "react";
import { Button, Table, Input, Space, message } from "antd";
import { DeleteCategory, GetCategory } from "../../../Apis/AdminApi";
import style from "./CategoryTable.module.css";

const { Search } = Input;

function CategoryTable({ catageryData, fetchCategories }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleResetSearch = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
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

  const handleDelete = async (record) => {
    console.log("record...", record._id);
    try {
      await DeleteCategory(record._id);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category");
    }
  };

  const filteredData = catageryData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={style.category_container}>
      <Space style={{ marginBottom: "24px" }}>
        <Search
          placeholder="Search categories"
          enterButton="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ marginRight: 8, maxWidth: "400px" }}
        />
        <Button type="primary" onClick={handleResetSearch}>
          Reset
        </Button>
      </Space>
      <Table
        style={{ fontWeight: "400" }}
        bordered
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 500 }}
      />
    </div>
  );
}

export default CategoryTable;

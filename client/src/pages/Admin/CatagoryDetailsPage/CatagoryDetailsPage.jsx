import React, { useEffect, useState } from "react";
import style from "./CatagoryDetailsPage.module.css";
import ProductsTable from "../../../components/Admin/ProductsTable/ProductsTable";
import { Button, Input, Modal, message } from "antd";
import { AddCatagory, GetCategory } from "../../../Apis/AdminApi";
import CategoryTable from "../../../components/Admin/CategoryTable/CategoryTable";

function CatagoryDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(""); // State to hold the category name
  const [categoryData, setCategoryData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchCategories = () => {
    GetCategory()
      .then((categories) => {
        setCategoryData(categories.data);
        console.log("categories", categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    // Fetch category data when the component mounts
    fetchCategories();
  }, []);

  const handleOk = async () => {
    try {
      let datas = {
        name: categoryName,
      };
      await AddCatagory(datas).then((response) => {
        console.log("AddCatagory..", response);
        if (response.status === 200) {
          message.success("Category added successfully");
          // Call the fetchCategories function to update categoryData
          fetchCategories();
          setIsModalOpen(false);
        } else {
          message.error("Failed to add category");
        }
      });
    } catch (error) {
      console.error("Error adding category:", error);
      // message.error("Failed to add category");
      message.error(`Failed to add category: ${error.response.data?.error}`);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={style.ProductsDetailsPage}>
        <div className={style.head_container}>
          <div className={style.head_text}>Catagories</div>
        </div>
        <div className={style.page_main_contianer}>
          <Button type="primary" onClick={showModal}>
            Add new category
          </Button>
          <CategoryTable
            catageryData={categoryData}
            fetchCategories={fetchCategories}
          />

          <Modal
            title="Add new category"
            visible={isModalOpen} // Use "visible" instead of "open"
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)} // Update the categoryName state on input change
            />
            <p>Category...</p>
          </Modal>
        </div>{" "}
      </div>
    </div>
  );
}

export default CatagoryDetailsPage;

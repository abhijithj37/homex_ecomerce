
import { Button, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { GetAllBanner,DeleteBanner } from "../../../../Apis/AdminApi";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_SERVER_BASE_URL;
function BannerTable() {
    const handleButtonClick = (key) => {
      console.log(`Button clicked for row with key ${key}`);
    };
  
    const [bannerData, setBannerData] = useState([]);
  
    const fetchBanners = () => {
      GetAllBanner()
        .then((banners) => {
          setBannerData(banners.data);
          console.log("banners", banners);
        })
        .catch((error) => {
          console.error("Error fetching banners:", error);
        });
    };
  
    console.log("bannerData:", bannerData);
  
    useEffect(() => {
      fetchBanners();
    }, []);
  
    const handleDelete = (record) => {
      const confirmDelete = () => {
        Modal.confirm({
          title: "Confirm Delete",
          content: "Are you sure you want to delete this banner?",
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk: async () => {
            try {
              await DeleteBanner(record._id);
              message.success("banner deleted successfully");
              fetchBanners();
            } catch (error) {
              console.error("Error deleting banner:", error);
              message.error("Failed to delete banner");
            }
          },
        });
      };
  
      confirmDelete();
    };
  
    const columns = [
      {
        title: "Heading",
        dataIndex: "heading",
        key: "heading",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image) => (
          <img
            src={url + "/images/" + image}
            alt="Banner"
            style={{ width: "50px" }}
          />
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
  
    return (
      <>
        <Table
          style={{ fontWeight: "400" }}
          scroll={{ x: 500 }}
          bordered
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
          }}
          dataSource={bannerData}
        />
      </>
    );
  }
  
  export default BannerTable;
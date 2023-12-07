// import { Button, Table } from "antd";
// import { useEffect, useState } from "react";
// import { GetAllBlogs } from "../../../Apis/AdminApi";

// function BlogTable() {
//   const handleButtonClick = (key) => {
//     // Handle the button click here, e.g., open a modal, update data, etc.
//     console.log(`Button clicked for row with key ${key}`);
//   };

//   const [blogData, setBlogData] = useState([]);

//   const fetchBlogs = () => {
//     GetAllBlogs()
//       .then((blogs) => {
//         setBlogData(blogs.data);
//         console.log("blogs", blogs);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//       });
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const columns = [
//     {
//       title: 'Heading',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     Table.EXPAND_COLUMN, ,
//     {
//       title: 'Image',
//       dataIndex: 'address',
//       key: 'address',
//     },

//     {
//       title: 'Edit',
//       dataIndex: 'address',
//       key: 'address',
//       render: (text, record) => (
//         <Button type="primary"  onClick={() => handleButtonClick(record.key)}>
//           Edit
//         </Button>
//       ),
//     },

//     {
//       title: 'Delete',
//       dataIndex: 'address',
//       key: 'address',
//       render: (text, record) => (
//         <Button type="primary" danger onClick={() => handleButtonClick(record.key)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];
//   const data = [
//     {
//       key: 1,
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//     },
//     {
//       key: 2,
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//     },
//     {
//       key: 3,
//       name: 'Not Expandable',
//       age: 29,
//       address: 'Jiangsu No. 1 Lake Park',
//       description: 'This not expandable',
//     },
//     {
//       key: 4,
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sydney No. 1 Lake Park',
//       description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
//     },
//   ];
//   return (
//     <>
//     <Table
//     bordered
//     columns={columns}
//     expandable={{
//       expandedRowRender: (record) => (
//         <p
//           style={{
//             margin: 0,
//           }}
//         >
//           {record.description}
//         </p>
//       ),
//     }}
//     dataSource={data}
//   />
//     </>
//   );
// }

// export default BlogTable;
import { Button, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteBlogById, GetAllBlogs } from "../../../Apis/AdminApi";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_SERVER_BASE_URL;

function BlogTable() {
  const handleButtonClick = (key) => {
    // Handle the button click here, e.g., open a modal, update data, etc.
    console.log(`Button clicked for row with key ${key}`);
  };

  const [blogData, setBlogData] = useState([]);

  const fetchBlogs = () => {
    GetAllBlogs()
      .then((blogs) => {
        setBlogData(blogs.data);
        console.log("blogs", blogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (record) => {
    const confirmDelete = () => {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this blog?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          try {
            await DeleteBlogById(record._id);
            message.success("blog deleted successfully");
            fetchBlogs();
          } catch (error) {
            console.error("Error deleting blog:", error);
            message.error("Failed to delete blog");
          }
        },
      });
    };

    confirmDelete();
  };


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span>{new Date(date).toLocaleDateString()}</span>
      ),
    },
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
          alt="Blog"
          style={{ width: "50px" }}
        />
      ),
    },
    {
      title: "Edit",
      render: (text, record) => (
        <Link to="/admin/blgoform" state={{ blog: record }}>
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
        dataSource={blogData}
      />
    </>
  );
}

export default BlogTable;

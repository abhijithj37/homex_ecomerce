// import { Button, Modal, Table, message } from "antd";
// import { useEffect, useState } from "react";
// import { DeleteBlogById, GetAllBlogs, GetAllUsers } from "../../../Apis/AdminApi";
// const url = import.meta.env.VITE_SERVER_BASE_URL;

// function UsersTable() {
//   const handleButtonClick = (key) => {
//     // Handle the button click here, e.g., open a modal, update data, etc.
//     console.log(`Button clicked for row with key ${key}`);
//   };

//   const [blogData, setBlogData] = useState([]);

//   const fetchBlogs = () => {
//     GetAllUsers()
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

//   const handleDelete = (record) => {
//     const confirmDelete = () => {
//       Modal.confirm({
//         title: "Confirm Delete",
//         content: "Are you sure you want to delete this product?",
//         okText: "Yes",
//         okType: "danger",
//         cancelText: "No",
//         onOk: async () => {
//           try {
//             await DeleteBlogById(record._id);
//             message.success("Product deleted successfully");
//             fetchBlogs();
//           } catch (error) {
//             console.error("Error deleting product:", error);
//             message.error("Failed to delete product");
//           }
//         },
//       });
//     };

//     confirmDelete();
//   };


//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date) => (
//         <span>{new Date(date).toLocaleDateString()}</span>
//       ),
//     },
//     {
//       title: "Heading",
//       dataIndex: "heading", 
//       key: "heading",
//     },
//     {
//       title: "Image",
//       dataIndex: "image", 
//       key: "image",
//       render: (image) => (
//         <img
//           src={url + "/images/" + image}
//           alt="Blog"
//           style={{ width: "50px" }}
//         />
//       ),
//     },
//     {
//       title: "Edit",
//       dataIndex: "key",
//       key: "edit",
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
//       <Table
//         style={{ fontWeight: "400" }}
//         scroll={{ x: 500 }}
//         bordered
//         columns={columns}
//         expandable={{
//           expandedRowRender: (record) => (
//             <p
//               style={{
//                 margin: 0,
//               }}
//             >
//               {record.description}
//             </p>
//           ),
//         }}
//         dataSource={blogData}
//       />
//     </>
//   );
// }

// export default UsersTable;
import { Button, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteBlogById, DeleteUser, GetAllBlogs, GetAllUsers } from "../../../Apis/AdminApi";
const url = import.meta.env.VITE_SERVER_BASE_URL;

function UsersTable() {
  const handleButtonClick = (key) => {
    // Handle the button click here, e.g., open a modal, update data, etc.
    console.log(`Button clicked for row with key ${key}`);
  };

  const [userData, setUserData] = useState([]);

  const fetchUsers = () => {
    GetAllUsers()
      .then((users) => {
        setUserData(users.data);
        console.log("users", users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (record) => {
    const confirmDelete = () => {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this user?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          try {
            await DeleteUser(record._id);
            message.success("User deleted successfully");
            fetchUsers();
          } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user");
          }
        },
      });
    };

    confirmDelete();
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
        dataSource={userData}
      />
    </>
  );
}

export default UsersTable;



import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";
import AdminSideNavbar from "../components/Admin/AdminSideNavbar/AdminSideNavbar";

function AdminLayout() {
  return (
    <>
      <div className="admin_wrapper">
        <div className="admin_container">
          <div className="AdminSideBar">
            <AdminSideNavbar />
          </div>
          <div className="admin_dashbaord_outlet">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;

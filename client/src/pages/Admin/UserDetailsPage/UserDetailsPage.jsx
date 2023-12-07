import React from "react";
import style from "./UserDetailsPage.module.css";
import UsersTable from "../../../components/Admin/UsersTable/UsersTable";

function UserDetailsPage() {
  return (
    <div>
      <div className={style.head_container}>
        <div className={style.head_text}>All Users</div>
      </div>
      <UsersTable />
    </div>
  );
}

export default UserDetailsPage;

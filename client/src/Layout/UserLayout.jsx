import { Outlet } from "react-router-dom";
import Navbar from "./../components/User/Navbar/Index";
import Footer from "../components/User/Footer/Footer";
import "./UserLayout.css";

function UserLayout() {
  return (
    <div className="UserLayout">
      
      <div className="nav_container">
        <Navbar />
      </div>

      <div className="UserLayout_oulet">
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
}

export default UserLayout;

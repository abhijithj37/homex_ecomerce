import AboutUs from "../../../components/User/AboutUs/AboutUs";
import MainBanner from "../../../components/User/Banners/MainBanner";
import Blog from "../../../components/User/Blog/Blog";
import FeaturedProduct from "../../../components/User/FeaturedProduct/FeaturedProduct";
import HeroPanel from "../../../components/User/HeroSection/HeroPanel";
import NewProduct from "../../../components/User/NewProduct/NewProduct";
import './HomePage.css'
function HomePage() {
  return (
    <div className="HomePage">
      <HeroPanel/>
      <MainBanner/>
      <NewProduct/>
      <AboutUs/>
      <FeaturedProduct/>
      <Blog/>
    </div>
  );
}

export default HomePage;

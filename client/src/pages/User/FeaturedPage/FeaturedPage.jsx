import { useEffect, useState } from "react";
import style from "./FeaturedPage.module.css";
import ProductCard from "../../../components/User/ProductCard/ProductCard";
import image1 from "../../../assets/images/Screenshot__450_-removebg-preview.png";
import image2 from "../../../assets/images/Screenshot__453_-removebg-preview.png";
import image3 from "../../../assets/images/Screenshot__452_-removebg-preview.png";
import image4 from "../../../assets/images/Screenshot__451_-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { FeaturedProducts } from "../../../Apis/UserApi";

function FeaturedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const fetchProduct = () => {
    FeaturedProducts().then((response) => {
      setProduct(response.data);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={style.product_container}>
      <p className={style.product_head}>
        FEATURED <span className={style.product_head_roduct}>PRODUCTS</span>
      </p>
      <div>
          {product.length > 0 ? (
        <div className={style.all_products_container}>
          {product.map((product, index) => (
            <div key={index} className={style.product}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className={style.no_product}>No products available</p>
      )}
      </div>
    </div>
  );
}

export default FeaturedPage;

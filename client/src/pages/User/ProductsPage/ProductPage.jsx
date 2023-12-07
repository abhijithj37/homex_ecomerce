import { useEffect, useRef, useState } from "react";
import style from "./ProductPage.module.css";
import ProductCard from "../../../components/User/ProductCard/ProductCard";
import image1 from "../../../assets/images/Screenshot__450_-removebg-preview.png";
import image2 from "../../../assets/images/Screenshot__453_-removebg-preview.png";
import image3 from "../../../assets/images/Screenshot__452_-removebg-preview.png";
import image4 from "../../../assets/images/Screenshot__451_-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { GetAllproduct, GetCategory } from "../../../Apis/AdminApi";
import { AllProducts, Catagories, GetAllProductsByCategory } from "../../../Apis/UserApi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";



function ProductPage() {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/single-product");
  };
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // Adjust the number of slides
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3); // Adjust the number of slides
  };
  const translateValue = `translateX(-${currentSlide * 100}%)`;

  const fetchProduct = () => {
    AllProducts().then((response) => {
      setProduct(response.data);
    });
  };
  // console.log("all products..",product)

  useEffect(() => {
    fetchProduct();
  }, []);

  GetAllProductsByCategory;

  const fetchCategories = () => {
    Catagories()
      .then((categories) => {
        // Add "All Products" category at the beginning
        const allProductsCategory = { id: 0, name: 'All Products' };
        setCategoryData([allProductsCategory, ...categories.data]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
  // console.log("selectedCategory:",selectedCatagory)

  const fetchProductsByCategory = (selectedCategory) => {
    if (selectedCategory === 'All Products') {
      // Fetch all products
      fetchProduct();
    } else {
      GetAllProductsByCategory(selectedCategory)
        .then((selectedProducts) => {
          console.log("selected category products", selectedProducts.data);
          setProduct(selectedProducts.data);
          // Update state or do something with the selected products
        })
        .catch((error) => {
          console.error("Error fetching selected category products:", error);
        });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCatagory) {
      fetchProductsByCategory(selectedCatagory);
    }
  }, [selectedCatagory]);

  const handleSetCatagory = (catagory) => {
    setSelectedCatagory(catagory);
  };


  return (
    
    <div className={style.product_container}>
      <p className={style.product_head}>
        OUR <span className={style.product_head_roduct}>PRODUCTS</span>
      </p>

      <div className={style.slider_wrapper}>
        <IoIosArrowRoundBack
          size={30}
          onClick={prevSlide}
          style={{ cursor: "pointer" }}
        />
        <div className={style.silder_container}>
          <div
            className={style.slide_container}
            style={{ transform: translateValue }}
          >
            {categoryData.map((category) => (
              <p
                key={category.id}
                className={`${style.category} ${
                  selectedCatagory === category.name ? style.selected : ''
                }`}
                onClick={() => handleSetCatagory(category.name)}
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <IoIosArrowRoundForward
          size={30}
          className={style.slide_button}
          onClick={nextSlide}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className={style.all_products_container}>
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

export default ProductPage;

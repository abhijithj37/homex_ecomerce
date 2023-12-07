import React, { useEffect, useRef, useState } from "react";
import style from "./SingleProductPage.module.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import aboutVideo from "../../../assets/video/pexels-diva-plavalaguna-6985519 (2160p).mp4";
import { InputNumber } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ProductImageViewer from "./ProductImageViewer/ProductImageViewer";
import { Link } from "react-router-dom";
import { PostAddToCart, PostCartnew } from "../../../Apis/UserApi";
import useUserCart from "../../../Store/CartStore";
import { Button, notification, Space } from "antd";
import Currency from "../../../components/User/ProductCard/Currency";

function SingleProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const { setUserCartzustand, currentUserCart } = useUserCart();

  // console.log("product:",product)

  const [cartDetail, SetCartDetails] = useState();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Product added to cart",
      description: product.title,
    });
  };

  const addToCart = () => {
    openNotificationWithIcon("success");
    console.log("addtoCart");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const cartData = {
        userID: user._id,
        products: [{ productID: product._id, quantity: quantity }],
      };
      PostCartnew(cartData).then((response) => {
        setUserCartzustand(response.data.products);
        console.log("logged user cart response:", response.data.products);
      });
    } else {
      const productToAdd = { ...product, quantity };
      let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product already exists in the cart
      const existingProductIndex = updatedCart.findIndex(
        (item) => item._id === product._id
      );
      if (existingProductIndex !== -1) {
        // Product already exists in the cart; update its quantity
        console.log("updatedCart update quantity", updatedCart);
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        // Product doesn't exist in the cart; add it as a new item
        console.log("updatedCart New item", updatedCart);
        updatedCart.push(productToAdd);
      }
      setUserCartzustand(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // ================================================//
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onChange = (value) => {
    console.log("changed", value);
    setQuantity(value || 1);
  };



  

  return (
    <div>
      {contextHolder}

      <div className={style.single_product_container}>
        <div className={style.back_btn}>
          <Link to="/products">BACK</Link>
        </div>

        <div className={style.product_details_container}>
          <div className={style.left_side}>
            <p className={style.left_side_product_name_heading}>
              {product.title}
            </p>
            <div>
              <ProductImageViewer images={product.images} />
            </div>
            <div className={style.product_add_tocart_container}>
              <p className={style.product_price}>
                {" "}
                {product.price} <Currency />
              </p>
              <div className={style.product_quantity}>
                {" "}
                <p>QUANTITY</p>{" "}
                <InputNumber
                  min={1}
                  // max={10}
                  defaultValue={1}
                  onChange={onChange}
                />{" "}
              </div>

              <button
                className={style.product_add_tocart_btn}
                onClick={addToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div className={style.right_side}>
            <div className={style.right_side_disc_container}>
              <p className={style.right_side_disc_heading}>{product?.title}</p>
              <p className={style.right_side_discription}>
                <p className={style.disc_text}>{product?.description}</p>
              </p>
            </div>
            <div className={style.right_side_spec_container}>
              <p className={style.right_side_specification_text}>
                SPECIFICATION
              </p>
              <p className={style.spec_text}> {product?.specification}</p>
            </div>
          </div>
        </div>

        <div className={style.product_video_container}>
          <p className={style.product_video_text}>
            PRODUCT <span className={style.product_span_text}>VIDEO</span>{" "}
          </p>
          <div className={style.product_video}>
            <div className={style.video_container}
              >
              <iframe
                title="YouTube Video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${product?.videolink}`}
                // src={`https://www.youtube.com/embed/kqu6nD9zqgA`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;

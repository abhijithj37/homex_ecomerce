import React, { useEffect, useState } from "react";
import style from "./MainBanner.module.css";
import { BsArrowRight } from "react-icons/bs";
import image1 from "../../../assets/images/Screenshot__450_-removebg-preview.png";
import image2 from "../../../assets/images/Screenshot__453_-removebg-preview.png";
import image3 from "../../../assets/images/Screenshot__452_-removebg-preview.png";
import image4 from "../../../assets/images/Screenshot__451_-removebg-preview.png";
import { AllBanners } from "../../../Apis/UserApi";
import { useNavigate } from "react-router-dom";

function MainBanner() {
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

  const [bannerData, setBannerData] = useState([]);

  const fetchBanners = () => {
    AllBanners()
      .then((banners) => {
        // Get only the first 4 banners
        const firstFourBanners = banners.data.slice(0, 4);
        setBannerData(firstFourBanners);
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

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };
  return (
    <div className={style.banner_container}>
      {/* BANNER ONE */}
      <div className={style.banner_one}>
        <div className={style.banner_one_text_container}>
          <p className={style.banner_one_head}>{bannerData[0]?.heading}</p>
          <p className={style.banner_one_paragraph}>
            {bannerData[0]?.description}
          </p>
          <button className={style.view_more_btn} onClick={handleClick}>
            view more
            <BsArrowRight size={16} />{" "}
          </button>
        </div>

        <div className={style.img_contaier}>
          {/* <img src={image1} alt="" /> */}
          <img
            className={style.product_image}
            src={baseUrl + "/images/" + bannerData[0]?.image}
            alt=""
          />
        </div>

        <button className={style.view_more_btn_mobile} onClick={handleClick}>
          view all <BsArrowRight size={16} />{" "}
        </button>
      </div>

      {/* =====BANNER ONE END===== */}
      <div className={style.banner_container_right}>
        <div className={style.banner_container_right_top}>
          {/* BANNER TWO */}
          <div className={style.banner_two}>
            <div className={style.banner_two_ovrley}></div>
            <div className={style.banner_two_text_container}>
              <p className={style.banner_one_head}>{bannerData[1]?.heading}</p>
              <p className={style.banner_one_paragraph}>
              {bannerData[1]?.description}
              </p>
            </div>
            <div className={style.banner_two_image}>
              <img
                className={style.product_image}
                src={baseUrl + "/images/" + bannerData[1]?.image}
                alt=""
              />
            </div>
          </div>

          <div className={style.banner_three}>
            {/* BANNER THREE */}
            <div className={style.banner_three_text_container}>
              <p className={style.banner_one_head}>
              {bannerData[2]?.heading}
              </p>
              <p className={style.banner_one_paragraph}>
              {bannerData[2]?.description}
              </p>
              <div className={style.banner_three_image}>
                <img
                  className={style.product_image}
                  src={baseUrl + "/images/" + bannerData[2]?.image}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className={style.banner_four}>
          {/* BANNER FOUR */}
          <div className={style.banner_four_text_container}>
            <p className={style.banner_one_head}>  {bannerData[3]?.heading}</p>
            <p className={style.banner_one_paragraph}>
            {bannerData[3]?.description}
            </p>
            <button className={style.view_more_btn} onClick={handleClick}>
              view all <BsArrowRight size={16} />{" "}
            </button>
          </div>
          <div className={style.banner_four_img_contaier}>
            <img
              className={style.product_image}
              src={baseUrl + "/images/" + bannerData[3]?.image}
              alt=""
            />
          </div>

          <button className={style.view_more_btn_mobile} onClick={handleClick}>
            View all <BsArrowRight size={16} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;

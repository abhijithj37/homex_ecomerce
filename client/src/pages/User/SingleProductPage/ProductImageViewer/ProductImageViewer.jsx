import React, { useState } from "react";
import style from "./ProductImageViewer.module.css"; // Import your CSS styles
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function ProductImageViewer({ images }) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] ? baseUrl + "/images/" + images[0].img : ""
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = (image) => {
    // Update the selected image when a thumbnail is clicked
    setSelectedImage(baseUrl + "/images/" + image.img);
  };

  return (
    <div className={style.product_image_selector_container}>
      <div className={style.product_image}>
        <img
          src={selectedImage}
          alt="Main Product"
          className={isHovered ? `${style.product_image_hovered}` : ""}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />{" "}
      </div>
      <div className={style.thumbnail_container}>
        {images.map((image, index) => (
          <div className={style.thumbnail}>
            <img
              key={index}
              src={baseUrl + "/images/" + image.img}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageViewer;

import React from 'react'
import style from "./ProductCard.module.css"
import { Link } from 'react-router-dom';
import Currency from './Currency';
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;



function ProductCard({newProduct,product}) {
  const description = product?.description;
  const productName=product?.title;
  const slicedDescription = description && description.length > 1 ? description.slice(0, 54) : description;
  const slicedProductName = productName && productName.length > 1 ? productName.slice(0, 64) : productName;


  return (
    <Link to='/single-product' className={style.product_link}  state={{ product: product }}>
    <div className={newProduct?style.newProduct_container:style.productCard_contaier}>
      <img className={style.product_image}  src={baseUrl + "/images/" + product?.images[0]?.img}alt="" />
      <p className={style.product_name}>{slicedProductName}</p>
      <p className={style.product_disc}>{slicedDescription}...</p>
      <div className={style.product_price}>{product?.price} <Currency/></div>
    </div>
    </Link>

  )
}

export default ProductCard


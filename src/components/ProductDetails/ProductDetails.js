import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../products/Products";

const ProductDetails = () => {
  const { key } = useParams();
  const [products,setProduct]= useState([]);
  useEffect(()=>{
    fetch(`https://shielded-basin-68218.herokuapp.com/totalProduct/`+key)
    .then(response => response.json())
    .then(data => setProduct(data))

  },[products])

  return (
    <>
      Your Product id: {key}
      <Products item={products} showAddtoCard={false}></Products>
    </>
  );
};

export default ProductDetails;

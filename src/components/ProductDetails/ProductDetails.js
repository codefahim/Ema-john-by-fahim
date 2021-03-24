import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Products from "../products/Products";

const ProductDetails = () => {
  const { key } = useParams();
  const products = fakeData.find((product) => product.key === key);
  console.log(products);
  return (
    <>
      Your Product id: {key}
      <Products item={products} showAddtoCard={false}></Products>
    </>
  );
};

export default ProductDetails;

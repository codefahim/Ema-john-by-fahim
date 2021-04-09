import React, { useEffect, useState } from "react";
import "./Manage.css";


const Manage = () => {
const products ={}
  //send data to server
const handleAddProduct=()=>{
  
    fetch(`https://shielded-basin-68218.herokuapp.com/products`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(products)
    })
    .then(response =>response.json())
    .then(result=>console.log(result))
  


  console.log('Add Product')
}

  return <div>
    <p>  Now you can add your products</p>
    <form action="" method="">
<span>Product Name:</span> <input type="text" name="productName" required /> <br/>
<span>Product Details:</span> <input type="text" name="productDetails" required /> <br/>
<span>Product Quantity:</span> <input type="number" name="productDetails" required /> <br/>
<span>Product Image:</span> <input type="file" name="productImage" required /> <br/>
    <button onClick={handleAddProduct}>Add Products</button>
    </form>
  
  </div>;
};

export default Manage;

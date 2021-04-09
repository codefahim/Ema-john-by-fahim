import React, { useEffect,useState } from "react";
import "./shop.css";
import Products from "../products/Products";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

const Shop = () => {
  
  const [product, setProduct] = useState([]);
  const [card, setCard] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // fetch(`https://shielded-basin-68218.herokuapp.com/totalProduct`)
    fetch(
      `https://shielded-basin-68218.herokuapp.com/totalProduct?search=` +
        search
    )
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch(`https://shielded-basin-68218.herokuapp.com/productByKeys`,{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(response =>response.json())
    .then(data => setCard(data))


    // if(product.length>0){
    //   const previewsCart = productKeys.map((exitingKey) => {
    //     const selectedProduct = product.find((data) => data.key === exitingKey);
    //     selectedProduct.quantity = savedCart[exitingKey];
    //     return selectedProduct;
    //   });
    //   setCard(previewsCart);
    
    // }

  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const handleClick = (product) => {
    let newCart;
    let countItems = 1;
    let sameProduct = card.find((pd) => pd.key === product.key);
    if (sameProduct) {
      countItems = sameProduct.quantity + 1;
      sameProduct.quantity = countItems;
      const otherProduct = card.filter((pd) => pd.key !== product.key);
      
      newCart = [...otherProduct, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...card, product];
    }
    setCard(newCart);
    addToDatabaseCart(product.key, countItems);
  };

  return (
    <div className='main'>
      <div className='product'>
        <input
         
         
         
          type='text'
        
        
        
             onBlur={handleSearch}
        
        
        
             placeholder='Search your products'
       
       
       
        />
        {product.length == 0 && <p>Loading...</p>}
        {product.map((item) => (
          <Products
            key={item.key}
            item={item}
            showAddtoCard={true}
            handleClick={handleClick}
          ></Products>
        ))}
      </div>
      <div className='card'>
        <Card card={card}>
          <Link to='/Order'>
            <button>Review Order</button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Shop;

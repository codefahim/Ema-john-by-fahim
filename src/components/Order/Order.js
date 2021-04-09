import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import successImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Card from "../Card/Card";
import ReviewItems from "../ReviewItems/ReviewItems";
import "./Order.css";

const Order = () => {
  const [cart, setCart] = useState([]);
  console.log(cart)
 
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedData = getDatabaseCart();
    const productsKey = Object.keys(savedData);
    fetch(`https://shielded-basin-68218.herokuapp.com/productsByKeys`,{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productsKey)
    })
    .then(response =>response.json())
    .then(data => setCart(data))


  }, []);

  const history = useHistory();
  const handleProceedCheckOut = () => {
    history.push(`/Shipment`);

    // setCart([]);
    // setOrderPlaced(true);
    // processOrder(); // localStorage.clear();
  };
  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={successImage} />;
  }
  return (
    <>
      <h1>Card Items : {cart.length}</h1>
      {cart.length == 0 && <p>Loading...</p>}
      <div className="main">
        <div className="product">
          {cart.map((item) => (
            <ReviewItems
              key={item.key}
              reviewItem={item}
              handleRemoveProduct={handleRemoveProduct}
            ></ReviewItems>
          ))}

          {thankyou}
        </div>
        <div className="card">
          <Card card={cart}>
            {/* <Link to="/Manage">  </Link> */}
            <button onClick={handleProceedCheckOut}>Proceed CheckOut</button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Order;

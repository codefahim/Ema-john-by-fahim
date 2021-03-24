import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fakeData from "../../fakeData";
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
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedData = getDatabaseCart();
    const productsKey = Object.keys(savedData);
    const cartProduct = productsKey.map((key) => {
      const product = fakeData.find((productItem) => productItem.key === key);
      product.quantity = savedData[key];
      return product;
    });
    setCart(cartProduct);
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

import React from "react";

const Card = (props) => {
  const lenght = props.card.length;


  const card = props.card;
 
  console.log(card)
  const totalPrice = card.reduce(
    (total, product) => total + product.price * product.quantity || 1,
    0
  );


  let vat = 0;
  if (totalPrice > 10 && totalPrice < 100) {
    vat = totalPrice * 0.3;
  } else if (totalPrice > 101 && totalPrice < 500) {
    vat = totalPrice * 0.15;
  } else if (totalPrice > 501) {
    vat = totalPrice * 0.07;
  }

  let shipping = 0;
  if (lenght > 0 && lenght < 5) {
    shipping = 50;
  } else if (lenght > 6 && lenght < 10) {
    shipping = 100;
  } else if (lenght > 11) {
    shipping = 0;
  }
  const finalCost = totalPrice + vat + shipping;

  return (
    <div style={{ position: "fixed" }}>
      <code>Order Summary</code>
      <div style={{ textAlign: "start", borderBottom: "1px solid gray" }}>
        <code
          style={{ display: "block", marginTop: "10px", marginLeft: "5px" }}
        >
          Total Item: <span>{props.card.length}</span>
        </code>
        <code
          style={{ display: "block", marginTop: "10px", marginLeft: "5px" }}
        >
          Item Cost: $<span> {totalPrice.toFixed(2)}</span>
         
        </code>
        <code
          style={{ display: "block", marginTop: "10px", marginLeft: "5px" }}
        >
          Shipping Cost: $<span>{shipping.toFixed(2)}</span>
        </code>
        <code
          style={{
            display: "block",
            marginTop: "10px",
            marginLeft: "5px",
            marginBottom: "10px",
          }}
        >
          TAX Cost: $<span>{vat.toFixed(2)}</span>
        </code>
      </div>
      <code
        style={{
          display: "block",
          marginTop: "10px",
          marginLeft: "5px",
          textAlign: "start",
        }}
      >
        Total Cost: $<span>{finalCost.toFixed(2)}</span>
      </code>

      {props.children}
    </div>
  );
};

export default Card;

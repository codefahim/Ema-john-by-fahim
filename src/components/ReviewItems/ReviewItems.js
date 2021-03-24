import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItems = (props) => {
  const items = props.reviewItem;
  const { name, quantity, img, price, key } = items;

  console.log(items);
  return (
    <div className="ProductBody">
      <div className="img">
        <img src={img} alt="" />
      </div>
      <div className="Details">
        <p className="productName">{name}</p>

        <p> Quantity: {quantity}</p>
        <p>
          Per Item Cost: $ <b>{price}</b>{" "}
        </p>
        <p>
          Cost: $ <span style={{ fontWeight: "bold" }}>{price * quantity}</span>
        </p>

        <button onClick={() => props.handleRemoveProduct(key)}>
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faTrashAlt} />{" "}
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItems;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();

  const [logInUser, setLogInUser] = useContext(userContext);
  const onSubmit = (data) => {
  
    const cart = getDatabaseCart();
    const orderDetails={...logInUser,products:cart,shipmentInfo:data,orderTime:new Date()}
    console.log(orderDetails)
    fetch(`http://localhost:5000/orders`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(response =>response.json())
    .then(result=>{
      if(result){
        processOrder()
        alert('Your order has been successfully created')
      }
    })
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">Full Name</label>
          <input
            name="firstName"
            placeholder={logInUser.name}
            defaultValue={logInUser.name}
            ref={register}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="bluebill1049@hotmail.com"
            type="email"
            defaultValue={logInUser.email}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            name="location"
            placeholder="Enter Your Location"
            ref={register}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Shipment;

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import SplitCardForm from '../ProcessPayment/SplitCardForm';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);

  const [logInUser, setLogInUser] = useContext(userContext);
  const onSubmit = (data) =>
  {
    setShippingData(data)
    // const cart = getDatabaseCart();
    // const orderDetails = {
    //   ...logInUser,
    //   products: cart,
    //   shipmentInfo: data,
    //   orderTime: new Date(),
    // };
    // fetch(`https://shielded-basin-68218.herokuapp.com/orders`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderDetails),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result) {
    //       processOrder();
    //       alert('Your order has been successfully created');
    //     }
    //   });
  };
  const handleSuccessOrder = (paymentId) => {
    const cart = getDatabaseCart();
    const orderDetails = {
      ...logInUser,
      products: cart,
      paymentId,
      shipmentInfo: shippingData,
      orderTime: new Date(),
    };
    fetch(`https://shielded-basin-68218.herokuapp.com/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          processOrder();
          alert('Your order has been successfully created');
        }
      });
  };
  return (
    <div className='App d-flex justify-content-center'>
      <div
        style={{ display: shippingData ? 'block' : 'none', width: '400px' }}
        className='col-md-6'
      >
        <ProcessPayment handlePayment={handleSuccessOrder} />

        {/* <SplitCardForm></SplitCardForm> */}
      </div>
      <div
        style={{ display: shippingData ? 'none' : 'block' }}
        className='col-md-6'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='firstName'>Full Name</label>
            <input
              name='firstName'
              placeholder={logInUser.name}
              defaultValue={logInUser.name}
              ref={register}
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              placeholder='bluebill1049@hotmail.com'
              type='email'
              defaultValue={logInUser.email}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor='location'>Location</label>
            <input
              name='location'
              placeholder='Enter Your Location'
              ref={register}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Shipment;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const [logInUser, setLogInUser] = useContext(userContext);

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

import React, { useContext } from "react";
import { useReducer, useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  FirebaseInt,
  handleGoogleSignIn,
  handleGoogleSignOut,
  handleFbSignIn,
  createNewUserWithEmail,
  loginWithEmailPass,
} from "./LoginFunction";

FirebaseInt();

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [logInUser, setLogInUser] = useContext(userContext);

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    sofol: "",
  });
  // Handle Response
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLogInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  // Import From Login Function
  const GoogleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const googleSignOut = () => {
    handleGoogleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const FbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  //user with custom email and pass
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createNewUserWithEmail(user.email, user.password, user.name).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      loginWithEmailPass(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    event.preventDefault();
  };
  // Import From Login Function

  const handleChange = (event) => {
    let text = event.target.value;
    let name = event.target.name;
    let valid = true;

    if (name === "email") {
      valid = /\S+@\S+\.\S+/.test(text);
    }
    if (name === "password") {
      valid = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/.test(text);
    }

    if (valid) {
      let newUser = { ...user };
      newUser[name] = text;
      setUser(newUser);
      console.log(user);
    }
  };

  return (
    <div className='App'>
      <h1>Google Sign In System</h1>
      <input type='email' placeholder='Enter Your Email' />
      {!user?.isSignedIn && (
        <button onClick={GoogleSignIn}>Google SignIn</button>
      )}
      {user.isSignedIn && (
        <button onClick={googleSignOut}>Google SignOut</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>{user.name}</p>
          <img src={user.photo} alt='mm' />
          <p>{user.email}</p>
        </div>
      )}
      <h4>Email And pass login</h4>
      <input
        type='checkbox'
        onChange={() => setNewUser(!newUser)}
        name='user'
        id=''
      />
      <label htmlFor='user'>New User</label>{' '}
      <form action='' onSubmit={handleSubmit} style={{ marginTop: '25px' }}>
        {newUser && (
          <input
            type='text'
            onBlur={handleChange}
            name='name'
            placeholder='user Name'
            style={{ marginTop: '5px', width: '15%', padding: '10px 0' }}
            required
          />
        )}
        <br />
        <input
          type='text'
          onBlur={handleChange}
          placeholder='Email/userId'
          name='email'
          required
          style={{ marginTop: '5px', width: '15%', padding: '10px 0' }}
        />
        <br />
        <input
          type='password'
          name='password'
          onBlur={handleChange}
          placeholder='password'
          required
          style={{ marginTop: '5px', width: '15%', padding: '10px 0' }}
        />
        <br />
        <em>Password must have 8 length, 1 special Char, 1 Uppercach </em>
        <br />
        {newUser && <input type='submit' value='SignUp' />}
        {!newUser && <input type='submit' value='SignIn' />}
      </form>
      {user.sofol && <em style={{ color: 'green' }}>{user.sofol}</em>}
      <em style={{ color: 'red', fontWeight: 'bold' }}> {user.error}</em>
      <h4>Login with Facebook</h4>
      <button onClick={FbSignIn}>Login With Facebook</button>
    </div>
  );
}

export default Login;

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const FirebaseInt = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

// Google Sign IN System start

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      const SignInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };

      return SignInUser;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
// Google Sign IN System End

// Google SignOut System start
export const handleGoogleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((signOut) => {
      const SignOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
      };

      return SignOutUser;
    });
};
// Google SignOut System End

// Facebook Sign System Start
export const handleFbSignIn = () => {
  const FacebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(FacebookProvider)
    .then((result) => {
      var credential = result.credential;
      var accessToken = credential.accessToken;
      var user = result.user;
      return user;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
};

// Facebook Sign System End

//Create New user with email and pass
export const createNewUserWithEmail = (email, password, name) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const newUser = userCredential.user;

      newUser.error = "";
      newUser.sofol = "User Created Successfully";
      updateUserName(name);
      return newUser;

      // ...
    })
    .catch((error) => {
      const newUser = {};
      newUser.error = error.message;
      newUser.sofol = "";
      return newUser;
    });
};
// Create New user with email and pass end

// User with Custom email and pass login start

export const loginWithEmailPass = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const newUser = userCredential.user;

      newUser.error = "";
      newUser.sofol = "Successfully Login";

      return newUser;
    })
    .catch((error) => {
      const newUser = {};
      newUser.error = error.message;
      newUser.sofol = "";
      return newUser;
    });
};

const updateUserName = (name) => {
  let userName = firebase.auth().currentUser;

  userName
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("name update");
    })
    .catch(function (error) {
      // An error happened.
    });
};

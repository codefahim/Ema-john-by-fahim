import "./App.css";
import Header from "./components/header/Header";
import Shop from "./components/shop/Shop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Order from "./components/Order/Order";
import Manage from "./components/Manage/Manage";
import Nomatch from "./components/NoMatch/Nomatch";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import { createContext, useContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const userContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <userContext.Provider value={[logInUser, setLogInUser]} className="App">
      <h3>Email:{logInUser.email}</h3>

      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/Order">
            <Order></Order>
          </Route>
          <PrivateRoute path="/Manage">
            <Manage></Manage>
          </PrivateRoute>
          <Route path="/Login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/product/:key">
            <ProductDetails></ProductDetails>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <Nomatch></Nomatch>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;

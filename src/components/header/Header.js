import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { userContext } from "../../App";

const Header = (props) => {
  const [logInUser, setLogInUser] = useContext(userContext);

  return (
    <>
      <div className="header">
        <img src={logo} alt="" />
      </div>
      <nav>
        <consumer>
          {(name) => {
            return name;
          }}
        </consumer>

        <Link to="/Shop" style={{ marginLeft: "7%" }}>
          Shop
        </Link>
        <Link to="/Order">Order Review</Link>
        <Link to="/Manage">Manage Inventory</Link>
        <button onClick={() => setLogInUser({})}>LogOut</button>
        <input type="text" placeholder="Enter Your Product Name" />
        <span
          style={{
            color: "white",
            fontSize: "28px",
            marginLeft: "115px",
            marginTop: "5px",
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </span>
        <span
          style={{
            color: "rgba(241, 196, 15,1.0)",
            fontWeight: "bold",
            fontSize: "28px",
            marginLeft: "10px",
          }}
        >
          0
        </span>
      </nav>
    </>
  );
};

export default Header;

import React,{useContext} from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import {AuthState} from '../App'

function Header() {
  const signOutHandler = () => {
    firebase.auth().signOut();
  };
  const authState=useContext(AuthState)

  return (
    <div className="header-main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/" className="links">
            <h2 className="logo">Todo</h2>
            <h5 className="logo1">by Waseem Munir</h5>
          </Link>
        </div>
        {authState ? (
          <div className="signout-menu">
            <Link onClick={signOutHandler} className="links" to="/login">
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="menu">
            <Link className="links" to="/login">
              Login
            </Link>
            <Link className="links" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

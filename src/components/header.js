import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector, provider } from 'react-redux'
import { logout } from "../actions/auth";
import sendLogo from '../assets/send-logo.png'

const Header = () => {
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("userrrrr", currentUser)
  const logOut = () => {

    dispatch(logout());
  };


  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        <img
          src={sendLogo}
          className="img-fluid"
          width="180"
          height="60"
          alt="Header logo"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!currentUser && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
              <NavLink
                className="nav-item nav-link btn btn-outline-primary"
                to="/login"
              >
                Login
              </NavLink>
            </React.Fragment>
          )}
          {currentUser && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {currentUser?.firstname?.toUpperCase()}
                {/* NAME */}
              </NavLink>
              <NavLink className="nav-item nav-link btn btn-secondary mr-1 ml-1 text-white" to="/createOrder">
                Create Order
              </NavLink>
              <NavLink
                className="nav-item nav-link btn btn-danger"
                to="/"
                onClick={logOut}
              >
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Header;
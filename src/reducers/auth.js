import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem('token'))
 
  const initialState = user
    ? { isLoggedIn: true, user, token }
    : { isLoggedIn: false, user: null, token: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        // JSON.parse(localStorage.getItem("user"));
        // JSON.parse(localStorage.getItem('token'))
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          token: payload.token
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
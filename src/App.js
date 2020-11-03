import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Footer from './components/footer'
import Profile from './components/profile'
import Header from './components/header'
import Register from './components/register'
import CreateOrder from './components/createOrder'
import Admin from './components/admin'
// import { clearMessage } from "./actions/messages";
import { history } from "./helpers/history";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
if(currentUser){
  console.log(currentUser)
}  
  
  return (
    <Fragment>    
    <div className="App">
      <Router history={history}
              basename={process.env.PUBLIC_URL}
              >    
      <ToastContainer />
      <Header />
      <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/createOrder" component={CreateOrder} />
            <Route exact path="/admin" component={Admin} />
      </Switch>
      <Footer/>
      </Router>
        </div>
        </Fragment>
  );
}



export default App;

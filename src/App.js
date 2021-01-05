import React, { Component } from 'react';
import { BrowserRouter, Route , Switch} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import './styles/foundation.min.css'
import Login from './components/Login/Login'
import Home from './components/Home/home'

import ViewProducts from './components/FetchData/GetProducts';
import PostProduct from './components/FetchData/PostProduct';
import MaterialTableDemo from './components/GetData/GetWorker';
import PostBill from './components/Bill/PostBill';
import ViewBill from './components/Bill/ViewBill';
import EditWorker from './components/Worker/EditWorker';
import HookCounter from './components/GetData/hook';
import PostWorker from './components/Worker/PostWorker';
import ViewWorkers from './components/Worker/ViewWorkers';

import MenuList from './components/FetchData/MenuList';
import ImgMediaCard from './components/FetchData/GetProducts';
import {Example} from './components/FetchData/Example';
import Message from './components/Home/Message';
import Dashboard from './components/DashBoard/dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
       
      <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/PostProduct" component={PostProduct} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/ViewProducts" component={ViewProducts} />
          <Route path="/ViewBill" component={ViewBill} />
          <Route path="/PostWorker" component={PostWorker} />
          <Route path="/MaterialTableDemo" component={MaterialTableDemo} />
          <Route path="/Example" component={Example} />
          <Route path="/Login" component={Login} />
          <Route component={MenuList}/>
        </Switch>
      </div>
        

      </BrowserRouter>
    )
  }
}

export default App;

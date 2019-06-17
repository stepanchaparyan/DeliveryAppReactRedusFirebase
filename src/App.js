import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import ForgotPassword from './components/auth/forgotPassword';
import Shops from './components/dashboard/shops';
import ShopDetails from './components/shops/shopDetails';
import Products from './components/dashboard/products';
import ProductDetails from './components/products/productDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgotPassword' component={ForgotPassword} />
            <Route path='/shops' component={Shops} />
            <Route path='/shop/:id' component={ShopDetails} />
            <Route path='/products' component={Products} />
            <Route path='/product/:id' component={ProductDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

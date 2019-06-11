import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ShopDetails from './components/shops/ShopDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/forgotPassword';
import AddShop from './components/shops/AddShop';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/shop/:id' component={ShopDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgotPassword' component={ForgotPassword} />
            <Route path='/addShop' component={AddShop} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

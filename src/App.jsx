import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import ForgotPassword from './components/auth/forgotPassword';
import Shops from './components/shops/shops';
import Products from './components/products/products';

import messagesEN from './en.messages';
import messagesHY from './hy.messages';
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import hy from 'react-intl/locale-data/hy';
addLocaleData([...en]);
addLocaleData([...hy]);

const messages = {
  en: messagesEN,
  hy: messagesHY
};

class App extends Component {
  state = {
    language: 'en'
  };

  changeLanguageToHY = () => {
    this.setState({
      language: 'hy'
    })
  }  

  changeLanguageToEN = () => {
    this.setState({
      language: 'en'
    })
  }  
  
  render() {
    let lang = this.state.language;
    return (
      <IntlProvider locale={lang} messages={messages[lang]} key={lang}>
        <BrowserRouter>
          <div className="App">
            <Navbar changeLanguageToHY={this.changeLanguageToHY} changeLanguageToEN={this.changeLanguageToEN}/>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/forgotPassword' component={ForgotPassword} />
              <Route path='/shops' component={Shops} />
              <Route path='/products' component={Products} />
            </Switch>
          </div>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default App;

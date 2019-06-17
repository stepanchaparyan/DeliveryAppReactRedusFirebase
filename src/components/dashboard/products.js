import React, { Component } from 'react';
import ProductList from '../products/productList';
import Notifications from './notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import './products.scss';
import AddProduct from '../products/addProduct';

class Products extends Component {
  render() {
    const { products, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="productListTitle">Product list</div>
          <ProductList products={products} />
          <AddProduct />
          <hr />
          <Notifications notifications={notifications} />   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'products', orderBy: [ 'name', 'asc' ] },
    { collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
  ])
)(Products)
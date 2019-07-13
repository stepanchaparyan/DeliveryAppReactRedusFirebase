import React, { Component } from 'react';
import ProductList from './productList';
import Notifications from '../dashboard/notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/products.scss';
import AddProduct from './addProduct';
import DocumentTitle from 'react-document-title';

class Products extends Component {
  render() {
    const { products, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <DocumentTitle title='Delivery Products'>
        <div className="productPage">
          <div className="productListTitle">Product list</div>
            <ProductList products={products} />
            <hr />
            <hr />
            <div className="productListTitle">Add new Product</div>
            <hr />
            <hr />
            <AddProduct />
            <hr />
            <Notifications notifications={notifications} />   
        </div>
      </DocumentTitle>
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
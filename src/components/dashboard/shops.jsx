import React, { Component } from 'react';
import ShopList from '../shops/shopList';
import Notifications from './notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/shops.scss';
import AddShop from '../shops/addShop';

class Shops extends Component {
  render() {
    const { shops, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="shopPage">
        <div className="shopListTitle">Shops list</div>
          <ShopList shops={shops}/>
          <hr />
          <hr />
          <div className="shopListTitle">Add new Shop</div>
          <hr />
          <hr />
          <AddShop />
          <hr />
          <Notifications notifications={notifications} />   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.firestore.ordered.shops,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'shops', orderBy: [ 'name', 'asc' ] },
    { collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
  ])
)(Shops)
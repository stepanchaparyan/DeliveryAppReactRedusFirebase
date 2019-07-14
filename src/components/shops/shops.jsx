import React, { Component } from 'react';
import ShopList from './shopList';
import Notifications from '../dashboard/notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/shops.scss';
import AddShop from './addShop';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types'; 

class Shops extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    notifications: PropTypes.arrayOf(PropTypes.object),
    shops: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { shops, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <DocumentTitle title='Delivery Shop'>
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
      </DocumentTitle>
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
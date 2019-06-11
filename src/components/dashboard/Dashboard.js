import React, { Component } from 'react';
import ShopList from '../shops/ShopList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import './dashboard.scss';

class Dashboard extends Component {
  render() {
    const { shops, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="shopListTitle">Shops list</div>
          <ShopList shops={shops} />
          <hr />
          <Notifications notifications={notifications} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   console.log(state);
  return {
    shops: state.firestore.ordered.shops,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: [ 'createdAt', 'desc' ] },
    { collection: 'shops' },
    { collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
  ])
)(Dashboard)
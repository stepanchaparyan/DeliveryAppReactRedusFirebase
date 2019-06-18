import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './dashboard.scss';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="text">This is the main page</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Dashboard)
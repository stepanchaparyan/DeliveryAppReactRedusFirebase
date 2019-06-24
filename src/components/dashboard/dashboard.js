import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './dashboard.scss';
import BG from '../../assets/bg2.jpg';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="mainText">This is the main page</div>
        <img id="BG" src={BG} />
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
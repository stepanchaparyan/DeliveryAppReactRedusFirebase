import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/dashboard.scss';
import BG from '../../assets/bg2.jpg';
import PropTypes from 'prop-types'; 
import messages from '../../en.messages';

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    })
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="mainText">{messages.mainText}</div>
        <img id="BG" src={BG} alt="justPhoto" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Dashboard)
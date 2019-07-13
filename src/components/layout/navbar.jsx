import React from 'react'
import SignedInLinks from './signedInLinks'
import SignedOutLinks from './signedOutLinks'
import { connect } from 'react-redux'
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import '../../stylesheets/navbar.scss';
import { FaTruck } from 'react-icons/fa';
import {FormattedMessage} from 'react-intl';

const MyNavbar = (props) => {
const { auth, profile, changeLanguageToHY, changeLanguageToEN } = props;
const links = auth.uid ? <SignedInLinks profile={profile} changeLanguageToHY={changeLanguageToHY} changeLanguageToEN={changeLanguageToEN}/> : <SignedOutLinks />;
  return (
    <Navbar className="p-2 bg-info text-white" light expand="md">
      <Container>
      <div className="iconAndTitle">
          <div className="FaTruck"> <FaTruck /></div>
          <NavbarBrand href="/">
              <FormattedMessage
                  id="projectTitle"
                  defaultMessage='projectTitle'
              />
          </NavbarBrand>
      </div>
      {links}
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(MyNavbar)

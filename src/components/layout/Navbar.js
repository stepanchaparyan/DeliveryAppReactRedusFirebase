import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import './navbar.scss';

const MyNavbar = (props) => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <Navbar className="p-2 bg-info text-white" light expand="md">
      <Container>
      <NavbarBrand href="/">Deliver App</NavbarBrand>
        {links}
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(MyNavbar)

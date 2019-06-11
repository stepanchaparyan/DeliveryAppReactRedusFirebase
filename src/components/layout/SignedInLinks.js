import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Nav, NavItem } from 'reactstrap';
import './navbar.scss';

const SignedInLinks = (props) => {
  return (
    <div>
      <Nav pills>
        <NavItem>
            <NavLink to='/addShop/' className="text-white nav-text">Add Shop</NavLink>
        </NavItem>
        <NavItem onClick={props.signOut} className="text-white nav-text">Sign Out</NavItem>
        <NavLink to='/' className="text-white nav-text profileName">
          {props.profile.firstName}
        </NavLink>
      </Nav>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)

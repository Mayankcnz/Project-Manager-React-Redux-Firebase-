// this is a functional component as it does not have a state of its own
import React from 'react'
import { NavLink } from 'react-router-dom' 
import {NavItem, Nav} from 'react-bootstrap'
import { connect } from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) =>{

    return (
       <Nav pullRight>
      <NavItem eventKey={1}>
        <NavLink to="/create">New Project</NavLink>
      </NavItem>
      <NavItem eventKey={2}>
      <NavItem><a onClick={props.signOut}>SignOut</a></NavItem>
      </NavItem>
    </Nav>
    )
}

const mapDispatchToProps = (dispatch) =>{
  
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
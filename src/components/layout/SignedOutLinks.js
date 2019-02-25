// this is a functional component as it does not have a state of its own
import React from 'react'
import { NavLink } from 'react-router-dom' 
import {NavItem, Nav} from 'react-bootstrap'

const SignedOutLinks = () =>{
    return (
        <Nav pullRight>
      <NavItem eventKey={1}>
        <NavLink to="/signin">SignIn</NavLink>
      </NavItem>
      <NavItem eventKey={2}>
      <NavLink to="/signup">SignUp</NavLink>
      </NavItem>
    </Nav>
    )
}

export default SignedOutLinks;
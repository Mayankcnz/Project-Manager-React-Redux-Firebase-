
import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import TogglerButton from '../SideBar/TogglerButton'
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';


const Header = (props) =>{


  console.log(props);

  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
  
  return (
  
    <Navbar inverse collapseOnSelect fixedTop={false} fluid={true}>
<Navbar.Header >
  <Navbar.Brand>
    <a pullLeft href="#brand"><TogglerButton onclick={props.togglerClickHandler} />   Project Manager</a>
  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
{links}
</Navbar.Collapse>
</Navbar>
  )
}

const mapStateToProps = (state) =>{
  console.log(state, "AHAHAH");
  return {
      auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Header);  

/**
 * 
 * 
 *     <nav className="navbar navbar-expand-xl navbar-dark bg-info">
        <TogglerButton click={props.togglerClickHandler} />
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <SignedInLinks />
            <SignedOutLinks />
        </div>

        </nav>
 */
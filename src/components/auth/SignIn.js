import React, { Component } from 'react';
import { Label, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import './SignIn.css';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'; 
import {Redirect} from 'react-router-dom';
import CustomFormGroup from './CustomFormGroup';
import ExternalLogin from './ExternalLogin';


class SignIn extends Component {

constructor(props, context) {
super(props, context);

this.state = {
  email: "",
  password: "",
  fireLogo: false
};
}

getValidationState() {
const email = this.state.email;
const password = this.state.password.length;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (emailRegex.test(email) && password >= 3) return 'success';
else if ( password < 3) return 'warning';
else return 'error';
}

handleSubmit = (event) => {
event.preventDefault();
this.fireLogo();
delete this.state.fireLogo;
this.props.signIn(this.state);
}

fireLogo = () =>{
  this.setState({fireLogo: true})
}

renderfireLogo = () =>{

  return (
    <div class="circles">
  <div></div>
  <div></div>
  <div></div>
  <span></span>
</div>
  )
}

handleChange =  (event) => {
  this.setState({
  fireLogo: false,
  [event.target.id]: event.target.value
});
}
render() {

  const { authError, auth } = this.props;


  if(auth.uid) {
    this.setState({fireLogo: false})
    return <Redirect to='/' />
  }
  
return (
  <div className="Login container">  
  {this.state.fireLogo ? this.renderfireLogo(): null}
  <form onSubmit={this.handleSubmit} >
  <CustomFormGroup id={"email"} type={"email"} callValidationState={this.getValidationState} instructions={"Enter Email"}  handleChange={this.handleChange} />
  <CustomFormGroup id={"password"} type={"password"} callValidationState={this.getValidationState} instructions={"Enter Password"}  handleChange={this.handleChange} />

  <Button
     block
     bsSize="large"
    
     type="submit"
  >
  SignIn
  </Button>
  <div className="center">{authError ? <p>{authError}</p> : null}</div>

  <div style={{textAlign:"center", marginTop: "2%"}}><h4>or</h4></div>

<ExternalLogin fireLogo={this.fireLogo}/>

</form>
</div>  
);
}
}

const mapStateToProps = (state) =>{

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

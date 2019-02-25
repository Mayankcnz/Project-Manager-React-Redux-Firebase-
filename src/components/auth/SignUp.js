import React, { Component } from 'react'
import { Button} from "react-bootstrap";
import './SignIn.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import Select from '../layout/Select';
import CustomFormGroup from './CustomFormGroup';

class SignUp extends Component {

constructor(props, context) {
super(props, context);


this.state = {
email: "",
password: "",
firstName:"",
lastName:""
};
}

getValidationState() {
const email = this.state.email;
const password = this.state.password.length;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if (emailRegex.test(email) && password > 4) return 'success';
else if ( password <= 4) return 'warning';
else return 'error';
}

handleSubmit = (event) => {
event.preventDefault();
this.props.signUp(this.state);

}

handleChange =  (event) => {
this.setState({
[event.target.id]: event.target.value
});

console.log(this.state);
}

handleSelect = (user)=>{
    this.setState({
    logInAs: user
    });
}

render() {
    let admin;
    if(this.state.logInAs === 'Admin'){
        admin =   <CustomFormGroup label={"AdminID"} callValidationState={this.getValidationState} instructions={"Enter AdminID"}  handleChange={this.handleChange} />
    }
    
    const {auth, authError} = this.props;

    if(auth.uid) return <Redirect to='/' />

return (
<div className="Login container">  
<form onSubmit={this.handleSubmit}>

    <div className="text">
    <Select onselect = {this.handleSelect} />
    </div>
    <CustomFormGroup id={"email"} type={"email"} callValidationState={this.getValidationState} instructions={"Enter Email"}  handleChange={this.handleChange} />
    <CustomFormGroup id={"password"} type={"password"} callValidationState={this.getValidationState} instructions={"Enter Password"}  handleChange={this.handleChange} />
    <CustomFormGroup id={"firstName"} type={"firstName"} callValidationState={this.getValidationState} instructions={"Enter FirstName"}  handleChange={this.handleChange} />
    <CustomFormGroup id={"lastName"} type={"lastName"} callValidationState={this.getValidationState} instructions={"Enter LastName"}  handleChange={this.handleChange} />
    {admin}

<Button
    block
    bsSize="large"
    type="submit"
    >
    SignUp
    </Button>
    <div className="center">{authError ? <p>{authError}</p> : null}</div>
</form>
</div>  
);
}
}

const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

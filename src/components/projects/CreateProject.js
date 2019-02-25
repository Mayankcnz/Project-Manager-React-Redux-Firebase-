import React, { Component } from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import {  createProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import CustomFormGroup from '../auth/CustomFormGroup';
import PopUp from '../projects/PopUp';
import AddressForm from '../form/AddressForm';
import './Form.css';


const stringOnly = RegExp(/^[A-Za-z]+$/);
const numbersOnly = RegExp(/^[0-9]*$/);
const date = RegExp(/^\d{4}\-\d{1,2}\-\d{1,2}$/);

const formEmpty = form => {
  let valid = false;
  Object.values(form).forEach(val => {
    val.length == 0 && (valid = true);
  })
  return valid;
}

const formValid = formErrors => {
  let valid = true;

  const lol = Object.values(formErrors);
  console.log(lol);
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  })
  return valid;
}

class CreateProject extends Component {

  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      formErrors:{
      title: '',
      content: '',
      },
      form:{
        title: '',
        content:''
      },
      projectFormErrors: {
      ownerName: '',
      projectManager:'',
      status:'',
      contactPerson:'',
      mobileNumber:'',
      startDate:'',
      endDate:'',
      },
      projectForm:{
        ownerName: '',
        projectManager:'',
        status:'',
        contactPerson:'',
        mobileNumber:'',
        startDate:'',
        endDate:'',
        ///onButtonPress:''
      },
      addressForm:{
        sampleTest: 'Invalid or Invalid Address'
      }, 
      authentication:{
        save: 'false',
        checked: ''
      }
    }
  }

  handleChange = (e) => {

    console.log(this.state);


    const {formErrors, projectFormErrors, form, projectForm, authentication} = this.state;
    authentication.save = 'false';
    //authentication.checked = '';
    const {id, value} = e.target

    switch(id){
      case 'title':
        form[id] = value;
        formErrors.title = value.length < 3
        ? 'minimum 3 characters required'
        : '';
        break;
        case 'content':
        form[id] = value;
        formErrors.content = value.length < 10
        ? 'minimum 10 characters required'
        : '';
        break;
        case 'ownerName':
        projectForm[id] = value;
        if(!stringOnly.test(value)){
          projectFormErrors.ownerName = "only alphabetic characters are allowed"
        }else if(value.length < 3){
          projectFormErrors.ownerName = "minimum 3 characters required";
        }else {
          projectFormErrors.ownerName = "";
        }
        break;
        case 'projectManager':
        projectForm[id] = value;
        if(!stringOnly.test(value)){
          projectFormErrors.projectManager = "only alphabetic characters are allowed"
        }else if(value.length < 3){
          projectFormErrors.projectManager = "minimum 3 characters required";
        }else {
          projectFormErrors.projectManager = "";
        }
        break;
        case 'status':
        projectForm[id] = value;
        if(!stringOnly.test(value)){
          projectFormErrors.status = "only alphabetic characters are allowed"
        }else if(value.length < 3){
          projectFormErrors.status = "minimum 3 characters required";
        }else {
          projectFormErrors.status = "";
        }
        break;
        case 'contactPerson':
        projectForm[id] = value;
        if(!stringOnly.test(value)){
          projectFormErrors.contactPerson = "only alphabetic characters are allowed"
        }else if(value.length < 3){
          projectFormErrors.contactPerson = "minimum 3 characters required";
        }else {
          projectFormErrors.contactPerson = "";
        }
        break;
        case 'mobileNumber':
        projectForm[id] = value;
        if(!numbersOnly.test(value)){
          projectFormErrors.mobileNumber = "only numbers are allowed"
        }else if(value.length < 4){
          projectFormErrors.mobileNumber = "minimum 4 characters required";
        }else {
          projectFormErrors.mobileNumber = "";
        }
        break;
        case 'startDate':
        projectForm[id] = value;
        if(!date.test(value)){
          projectFormErrors.startDate = "invalid start date"
        }else {
          projectFormErrors.startDate = "";
        }
        break;
        case 'endDate':
        projectForm[id] = value;
        if(!date.test(value)){
          projectFormErrors.endDate = "invalid end date"
        }else if(new Date(value) <= new Date(this.state.startDate)){
          projectFormErrors.endDate = "end date cannot be less than the start date"
        }else {
          projectFormErrors.endDate = "";
        }
        break;
        

    }
    this.setState({
      form,
      projectForm,
      formErrors,
      authentication,
      projectFormErrors,
    })

  }
  
  handleSubmit = (e) => {

    e.preventDefault();

     let authentication = this.state.authentication;

     authentication.checked = "true";
     this.setState({
       ...this.state,
       authentication
     })

    // if this form or address form is invalid or incomplete, return from function without submitting
    if(!this.checkForm()){
      return;
    }
 
    // delete all the useless stuff before posting to the firebase
    delete this.state.formErrors;
    delete this.state.projectFormErrors;
    delete this.state.addressForm;
    delete this.state.authentication;

    const project = {
      form:{
          ...this.state.form,
          ...this.state.projectForm
      },
      address: {
          ...this.props.address
      }
    }


    this.props.createProject(project);
    this.props.history.push('/');
  }

  checkForm = () =>{

    if(formEmpty(this.state.form) || formEmpty(this.state.projectForm) || formEmpty(this.state.form) 
    || !formEmpty(this.state.addressForm) || !formValid(this.state.formErrors) || !formValid(this.state.projectFormErrors)){
        return false;
    }
    
        return true;
  }

  handleSave = (e) =>{
    
      let authentication = this.state.authentication;
      let formErrors = this.state.formErrors;
      authentication.save ='';
      this.setState({
          ...this.state,
          authentication
      })
   // if(!this.checkForm(formErrors) ){
       //  formErrors.address = "The address is not valid"
       //   this.setState({
        // ...this.state,
        // formErrors
   ///  });
    //}
  }

  isAddressValid = (isValid) =>{

    let formErrors = this.state.formErrors;

    if(!isValid){
      formErrors.address = "The given address is not valid"
    }else {
      formErrors.address = "";
    }
  }

  handleClear = () =>{

    const state = this.getInitialState();
    this.setState(state);
  }

  createProjectError(){

    if(this.state.authentication.checked === ""){
      return;
    }


    // check address form, form, and project form , also check for error form
    if(!this.checkForm()){
    return (
      <div className="alert alert-warning" role="alert" style={{position: "static", height: "20%", width: "90%", marginLeft: "20px", marginTop: "40px"}}>
        Form is invalid or incomplete
      </div>
    );
    }else {
      return (
        <div className="alert alert-success" role="alert" style={{position: "static", height: "20%", width: "90%", marginLeft: "20px", marginTop: "40px"}}>
          Project Successfully Created
        </div>
      );
    }
  }

  saveProjectError(){

    if(this.state.authentication.save !== ""){
      return;
    }
  
    if(!formValid(this.state.projectFormErrors) || formEmpty(this.state.projectForm)){
    return (
      <div className="alert alert-warning" role="alert" style={{position: "static", height: "20%", width: "90%", marginLeft: "20px", marginTop: "40px"}}>
        Form is invalid or incomplete
      </div>
    );
    }else {
      return (
        <div className="alert alert-success" role="alert" style={{position: "static", height: "20%", width: "90%", marginLeft: "20px", marginTop: "40px"}}>
          Form Saved Successfully
        </div>
      );
    }
  }

  setAddressState = (input) =>{


     this.setState({addressForm: {sampleTest: ''}}, function(){
      console.log(this.state.addressForm.sampleTest, "og");
     });


  }

  render() {

    const {auth} = this.props;
    const {formErrors, form} = this.state;
    const {projectFormErrors, projectForm} = this.state;
    if(!auth.uid) return <Redirect to='/signin' />

    let formError = this.createProjectError();
    let saveError = this.saveProjectError();

    return (
       <div className="container " style={{maxWidth:"1000px", paddingTop: "40px"}}>  
      <Form className="createProjectForm">
           <CustomFormGroup  id={"title"} value={form.title} formError={formErrors.title} message={formErrors.title.length > 0 ? "error" : null} callValidationState={this.getValidationState} instructions={"Title"}  handleChange={this.handleChange} />{' '}
            <CustomFormGroup id={"content"} value={form.content} formError={formErrors.content} message={formErrors.content.length > 0 ? "error" : null}  callValidationState={this.getValidationState} instructions={"Description"}  handleChange={this.handleChange} />{' '}

               <div className="row text-center">
                  <div className="col-xs-12 col-sm-6"><PopUp save={this.handleSave} clear={this.handleClear} buttonName={"Project Details"} title={"Project Details"} >
                    <CustomFormGroup id={"ownerName"} value={projectForm.ownerName} formError={projectFormErrors.ownerName} message={projectFormErrors.ownerName.length > 0 ? "error" : null}  callValidationState={this.getValidationState} instructions={"Owner Name"}  handleChange={this.handleChange} />{' '}
                   
                    <CustomFormGroup id={"projectManager"} value= {projectForm.projectManager} formError={projectFormErrors.projectManager} message={projectFormErrors.projectManager.length > 0 ? "error" : null} callValidationState={this.getValidationState} instructions={"Project Manager"}  handleChange={this.handleChange} />{' '}
                       
                     <CustomFormGroup id={"status"} value={projectForm.status} formError={projectFormErrors.status} message={projectFormErrors.status.length > 0 ? "error" : null}  callValidationState={this.getValidationState} instructions={"Status"}  handleChange={this.handleChange} />{' '}
                       
                       <div className="row" >
                        <div className="col-sm-6 col-lg-6" >
                        <CustomFormGroup id={"contactPerson"} value={projectForm.contactPerson} formError={projectFormErrors.contactPerson} message={projectFormErrors.contactPerson.length > 0 ? "error" : null}  callValidationState={this.getValidationState} instructions={"Contact Person"}  handleChange={this.handleChange} />{' '}
                         
                        </div>
                        <div className="col-sm-6 col-lg-6">
                        <CustomFormGroup id={"mobileNumber"} value={projectForm.mobileNumber} formError={projectFormErrors.mobileNumber} message={projectFormErrors.mobileNumber.length > 0 ? "error" : null}  callValidationState={this.getValidationState} instructions={"Mobilr/Phone"}  handleChange={this.handleChange} />{' '}
                          
                        </div>
                        </div>

                      <div className="row">
                        <div className="col-sm-6 col-lg-6" >
                        <CustomFormGroup id={"startDate"} value={projectForm.startDate} formError={projectFormErrors.startDate} message={projectFormErrors.startDate.length > 0 ? "error" : null} type={"date"} callValidationState={this.getValidationState} instructions={"Start date"}  handleChange={this.handleChange} />{' '}
                          
                        </div>
                        <div className="col-sm-6 col-lg-6">
                        <CustomFormGroup id={"endDate"} value={projectForm.endDate} formError={projectFormErrors.endDate} message={projectFormErrors.endDate.length > 0 ? "error" : null}  type={"date"} callValidationState={this.getValidationState} instructions={"End date"}  handleChange={this.handleChange} />{' '}
                          
                        </div>
                        </div>
                        {saveError}
                  </PopUp>
                
             </div>
               <div className="col-xs-12 col-sm-6">
                  <AddressForm errorInformation={this.setAddressState} />

               </div>
        </div>

        <div className="row text-center" >
        <div className=" col-xs-12">
            <button id="creatProject" onClick={this.handleSubmit} class="btn btn-primary">Create Project</button>
          </div>
          {formError}
          
        </div>

      </Form>
</div>  
    )
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {// add proeprties to the props of this component
      createProject: (project) => dispatch(createProject(project))
  }
}

const mapStateToProps = (state) =>{
  return {
    auth: state.firebase.auth,
    address: state.address
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject);
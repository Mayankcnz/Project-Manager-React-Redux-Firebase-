import React, { Component } from 'react'
import ListComponent from './ListComponent';
import {connect} from 'react-redux';
import { updateProject } from '../../store/actions/projectActions';
import update from 'immutability-helper';

class List extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      form: { 
      ownerName: this.props.project.ownerName,
      projectManager:this.props.project.projectManager,
      status:this.props.project.status,
      contactPerson:this.props.project.contactPerson,
      mobileNumber:this.props.project.mobileNumber,
      startDate:this.props.project.startDate,
      endDate:this.props.project.endDate
      },
       uiManagement:{
        showSubmitButton: true
      }
    }

}

handleChange = (id, value) =>{

  this.state.form[id] = value;
  this.forceUpdate();

   if(this.state.uiManagement.showSubmitButton !== false){
      this.setState({uiManagement: {showSubmitButton: false}});
 }

}

 handleSubmit = (e) =>{
    
  this.props.updateProject(this.state.form, this.props.id);
  this.setState({uiManagement: {showSubmitButton: true}});
  
  }

  
    render(){
      const {project} = this.props;

        return(
                 <div class="container-fluid" style={{marginLeft:"-15px"}}>
    <div class="row text-center">    
        <div class="col-lg-12">

            <div class="panel panel-default panel-table">
              <div class="panel-heading">
                <div class="row">
                  <div class="col col-xs-6">
                    <h3 class="panel-title">Project Information</h3>
                  </div>
                  <div class="col col-xs-6">
                    <button disabled={this.state.uiManagement.showSubmitButton} onClick={this.handleSubmit} type="button" class="btn btn-sm btn-primary btn-create">Submit Changes</button>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <table class="table table-striped table-bordered table-list">
                  <thead>
                    <tr>
                        <th><em class="fa fa-cog"></em></th>
                        <th>Type</th>
                        <th>Information</th>
                    </tr> 
                  </thead>
                  <ListComponent id={this.props.id} selector={"startDate"} project={this.props.project} type={"Start Date"} information={this.state.form.startDate} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                  <ListComponent id={this.props.id} selector={"endDate"} project={this.props.project} type={"End Date"} information={this.state.form.endDate} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                  <ListComponent id={this.props.id}  selector={"projectManager"}  project={this.props.project} type={"Project Manager"} information={this.state.form.projectManager} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                  <ListComponent id={this.props.id}  selector={"ownerName"} project={this.props.project} type={"Owner Name"} information={this.state.form.ownerName} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                  <ListComponent id={this.props.id}  selector={"contactPerson"} project={this.props.project} type={"Contact Person"} information={this.state.form.contactPerson} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                  <ListComponent id={this.props.id}  selector={"mobileNumber"} project={this.props.project} type={"Mobile Number"} information={this.state.form.mobileNumber} handlechange={this.handleChange} handleSubmit={this.handleSubmit} />
                </table>
            
                <div className="col-xs-12" ><i class="fas fa-plus"></i></div>
              </div>   
              </div>
              </div>
              </div>
              </div>

        );
    }

}


const mapDispatchToProps = (dispatch)=>{
  return {// add proeprties to the props of this component
    updateProject: (project, id) => dispatch(updateProject(project,id))
}
}


export default connect(null, mapDispatchToProps)(List);
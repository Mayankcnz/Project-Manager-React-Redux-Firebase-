import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import TogglerButton from '../SideBar/TogglerButton';
import {Collapse, Well, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {deleteProject} from '../../store/actions/projectActions';


class ProjectSummary extends React.Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
      }

    toggle(){
        this.props.toggle(this.props.project);
    }

    getAppropriateLabel(){
        const {status} = this.props.project;

        if(status === ''){
            return 'Default';
        }else if(status === 'Ongoing'){
            return 'Success';
        }else if(status === 'delayed'){
            return 'warning';
        }
    }

    handleDelete = (e) =>{
        this.props.deleteProject(this.props.project);
    }

    render(){
    const {project} = this.props;

    const labelType = null; // map state to props the status of the projects .. umm each project that we are going to render// well not in this class but in its parent class
     // and pass into this method as props and justify a label based on that

    return (
    <div class ="card thumbnail card-hover h-100">
        <div class="card-body"style={{position: "relative"}}>
            <h5 class="card-title" style={{fontSize:'20px'}}>{project.title}</h5>
            <h5>Posted by {project.authorFirstName} {project.authorLastName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{moment(project.createdAt.toDate()).calendar()}</h6>
            <p class="card-text">{project.form.title}</p>
            <Link to={'project/'+project.id} className="btn btn-primary" style={{marginRight:"20px"}} >continue</Link>
            <div onClick={this.handleDelete} class="reveal btn btn-primary" style={{position: "absolute" , right: "0"}}>delete</div>
            <div style={{position: "absolute" , top: "0", right:"0"}}>status: <Label bsStyle={this.getAppropriateLabel()} >Ongoing</Label></div>
            <h5 style={{display:"inline"}}>More Info: </h5> <TogglerButton onclick={this.toggle}/>
            <Collapse in={this.props.isOpen} >
                <div style={{marginTop:"20px"}}>
                    <Well>
                        {project.form.content}
                    </Well>
                </div>
            </Collapse>
        </div>
    </div>
    )
}
}

const mapDispatchToProps = (dispatch) =>{

    return {// add proeprties to the props of this component
        deleteProject: (project) => dispatch(deleteProject(project))
    }

}

export default connect(null,mapDispatchToProps)(ProjectSummary);
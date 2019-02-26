import React from 'react'
import { connect } from 'react-redux';
import {firestoreConnect} from  'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import './projectSummary.css'
import TabBar from './TabBar';
import AddComent from './AddComent';


// router on rednering attaches some propes automatically inside the component which contains details about the router
const ProjectDetails = (props) =>{


    const {project, auth, userComments} = props;

   // const filteredComments = userComments && userComments.filter(comment => comment.projectId === props.id);
  
    if(!auth.uid) return <Redirect to='/signin' />

    if(project){
    return(
            <div className="container-fluid">
            <h1 id="projectHeading">Project Name <span>{project.form.title}</span></h1>
  <div className="row list" style={{backgroundColor:"#D3D3D3", border:"5px solid #787878", borderRadius:"10px", marginLeft: "2%", marginRight:"2%"}}>
    <div className="col-xs-12 col-sm-6 list-item"><div className="list-content" >
        
    <section class="psummary">
    <div class="psummary-left">
      <p><span class="entypo-attention"></span>Status</p>
      <p>Development</p>
      <p><span class="entypo-hourglass"></span> Priority</p>
      <p>Urgent</p>
    </div>
  </section>    
    
    </div>
    </div>
    <div className="col-xs-12 col-sm-6 list-item"><div className="list-content">
        
    <section class="psummary">

    <div class="psummary-right">
      <p><span class="entypo-chart-line"></span> Progress</p>
      <div class="progress">
        <progress max="100" value="70"></progress>
      <span>70%</span></div>
    </div>


    </section>
        
        </div></div>
  </div>
  <div className="row parent"> {/*  list-parent  */}
    <div className="nestedContainer3 list-item"><div className="list-content"><TabBar id={props.id} project={project}/></div></div>
    {/*<div className="col-sm-12 col-md-4 nestedContainer4 list-item" style={{backgroundColor:"lightgrey", marginTop:"40px"}}><div className="list-content">.col-xs-6 .col-md-2</div></div>*/}
  </div>
  <AddComent comments={userComments} id={props.id} auth={auth} />
   
</div>

    );
    }else {
        return (
            <div className="container center">
                <p>Loading Project.... </p>
            </div>
        );
    }
}

const mapStateToProps = (state, myProps) =>{ 
    const id = myProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    const comments  = state.firestore.ordered.comments;
    const replies = state.firestore.ordered.replies;

    //const getComments = comments && comments.map(comment => console.log(comment));
    //console.log(projects, "REAL COMMENTS");
    return {
        project: project,
        auth: state.firebase.auth,
        id: id,
        userComments: comments,
        replies: replies
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(props =>[
        {collection: 'projects'},
        {
          collection: 'comments',
          where: [['projectId', '==', props.id]]
        },
        {collection: 'replies',
      storeAs:"replies"}
    ])
)(ProjectDetails)

/**
 *         {collection: 'comments',
         storeAs: 'userComments',
         where : [['projectId', '==', props.id]]
 */
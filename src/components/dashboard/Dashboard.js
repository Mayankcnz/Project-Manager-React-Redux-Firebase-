import React,  { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux';
import './DashBoard.css';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handleRedirect = (id) =>{
        return <Redirect to='/signin' />
    }

    handler(){
        return <Redirect to='/create' />
    }

render(){

    const {projects, auth, notifications, tasks} = this.props;


    console.log("MY AUTH"+auth.uid);
    console.log(projects, "all projects");

    console.log(notifications, "Notifications");

    if(!auth.uid) return <Redirect to='/signin' />

    return(
    <div className="dashboard container-fluid">
        <div className="row">
            <div className='col-sm-6' id="nestedContainer1">
                    <ProjectList projects={projects} />
            </div>
                <div className='col-sm-6' >
                    <Notifications notifications={notifications}/>
            </div>
        </div> 
    </div>
    )
}
}

/**
 * 
 * @param {}
 */
const mapStateToProps = (state) =>{ // accessing state of the store , can grab stuff from the state and attach it to props

    return {
    notifications: state.firestore.ordered.notifications,
    sideBarOpen: state.sidebar.sideBarOpen, // add sideBarOpen property to props of this component. so we can access it insoide this component
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    address: state.address.address
} // store knows which reducer will handle the dispatch action
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc']},
      { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
  )(Dashboard)


  /**
   *  { collection: 'projects',
       doc: 'tFLcawA0NnuAxpXMZ5BH',
        subcollections: [
            {collection: 'tasks'}
        ]}
   */
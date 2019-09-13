import React, { Component } from 'react'
import firebase from "firebase";
import {connect} from 'react-redux';
import {getAllTasks} from '../../store/actions/taskActions';
import RenderTaskList from './RenderTaskList';




class TaskList extends Component {


    state = {
        tasks: '',
        clicked: false,
        taskListName: '',
        submit: false
    }

    /**
     * get all the tasks
     */
    componentWillMount(){
        this.props.getTasks();
    }

    render(){
        
        return (
            <div className="container-fluid">
                <RenderTaskList projectID = {this.props.projectID} newList= {false} taskList={this.props.taskList}/>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        getTasks: () => dispatch(getAllTasks())
    }
}

const mapStateToProps = (state) =>{
    return {
        taskList: state.taskList
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
import React, { Component } from 'react'
import {connect} from 'react-redux';
import TaskManager from './TaskManager';
import './TaskList.css';
import {addTaskToDatabase} from '../../store/actions/taskActions';
import {getTasks} from '../../store/actions/taskActions';


class RenderTasks extends Component {

    state = {
        clicked: false,
        taskListName: '',
        submit: false
    }

    handleClick = (e) =>{
        e.preventDefault();

        this.setState({clicked: true})
    }

    renderDefault(){
        return (
            <div onClick={this.handleClick} className="box">
                <h6>+Add a Task List</h6>
            </div>
        )
    }

    handleChange = (e) =>{
        this.setState({taskListName : e.target.value});
    }

    renderOnClick = () =>{
        return (
            <div className="boxClicked">
            <input id={"taskListName"} placeholder= "Name of the Task List" className="text-center" type="text" autoFocus={true} value={this.state.taskListName} onChange={this.handleChange} /> 
                <button  onClick={() =>{this.handleButtonEvent("Submit")}} id="AddTaskList"><p>Add Task List</p></button>
                <button  onClick={() =>{this.handleButtonEvent("Cancel")}} id="Cancel" type="submit"><p>Cancel</p></button>
         </div>
        )
    }

    handleButtonEvent = (action) =>{

        this.setState({clicked: false})
        if(action === "Submit"){
            const data = {
                heading: this.state.taskListName,
                tasks: []
            }
         
           // this.props.addTask(data);
            this.props.addTaskToDatabase(this.props.projectID, data); // this should be the one updating redux
            this.props.getTasks(this.props.projectID); // change this to only get taskList that have changed, 
        }
    }


    render(){


        return (
        <div>
            {this.state.submit ? <TaskManager taskListName={this.state.taskListName}/> : null}
            {this.state.clicked ? this.renderOnClick() : !this.state.submit ?  this.renderDefault() : null}
        </div>
     )
    }
}


const mapDispatchToProps = (dispatch) =>{
   
    return {
        addTask: (data) => dispatch({
            type: 'ADD_THIS',
            data
        }),
        addTaskToDatabase: (id,data) => dispatch(addTaskToDatabase(id,data)),
        getTasks:(taskListID) => dispatch(getTasks(taskListID))
}
}

export default connect(null, mapDispatchToProps)(RenderTasks);

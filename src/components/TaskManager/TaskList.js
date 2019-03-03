import React, { Component } from 'react'
import './TaskList.css'
import TaskManager from './TaskManager'



class TaskList extends Component {


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

        console.log(this.state.taskListName);
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
            this.setState({submit: true});
        }
    }

    render(){

        return (

            <div>
                {this.state.submit ? <TaskManager taskListName={this.state.taskListName}/> : null}
                {this.state.clicked ? this.renderOnClick() : this.renderDefault()}
            </div>

        )
    }
}

export default TaskList;
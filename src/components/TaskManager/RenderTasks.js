import React, { Component } from 'react'
import {connect} from 'react-redux';
import './Test.css';
import {addTaskComponentToDatabase} from '../../store/actions/taskActions';
import {getTasks} from '../../store/actions/taskActions';


class RenderTasks extends Component {

constructor(){
    super();
    this.state = {
        task: [],
        taskName: '',
        addTaskMode: false,
    }

};

    handleClick = () =>{

        // here if the user adds something to the list, we going to add to the local array , hence update the UI state
        // in terms of updating the real time database
        // we going to pass each time each value and add to the array

        this.setState({addTaskMode: true})
        //console.log("Not implemented");
    }


    renderTaskMode = () =>{

        return (
        <div className="boxClicked">
            <input id={"taskName"} placeholder= "Name of the Task List" className="text-center" type="text" autoFocus={true} value={this.state.taskName} onChange={this.handleChange} /> 
                <button  onClick={this.handleSubmit} id="AddTaskList"><p>Add Task List</p></button>
                <button  onClick={this.handleCancel} id="Cancel" type="submit"><p>Cancel</p></button>
         </div>
        )
    }

    handleSubmit = (event) =>{

        const {task} = this.state;

        if(this.state.addTaskMode){
            this.setState(({
                task,
                taskName: '',
                addTaskMode: false
            }))
        }

      //  console.log(this.props.task.id, "DIDDD");
        //this.props.addTask(this.props.task.id, this.state.taskName);


        this.props.addTaskComponentToDatabase(this.props.task.id, this.state.taskName);
        this.props.getTasks(this.props.task.id);

    }

    handleCancel = () =>{
        
        this.setState({addTaskMode: false})
    }

    handleChange=(e)=>{

        e.preventDefault();
        this.setState({taskName: e.target.value})

    }

    render(){

        return (

            // easier to manage the 

            <div className="something">
                {this.state.addTaskMode ? this.renderTaskMode() : <div className="addTask" onClick={this.handleClick}>
                <h6>+Add a Task</h6>
                </div>   
            }     
            {this.props.tasks}     
            </div>
        )

    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        addTask: (id, taskName) => dispatch({
            type: 'ADD_SUBTASK',
            id,
            taskName
        }),

        addTaskComponentToDatabase: (id, taskName) => dispatch(addTaskComponentToDatabase(id, taskName)),
        getTasks:(id) => dispatch(getTasks(id)) 
    }
}


export default connect(null, mapDispatchToProps)(RenderTasks);

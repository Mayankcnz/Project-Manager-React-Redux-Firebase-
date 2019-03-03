import React, { Component } from 'react'
import './TaskManager.css'
import './Draggable.css'


class TaskManager extends Component {


	state = {
        tasks: [
            {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"}
          ]
	}
	
	onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
	}
	
	onDrop = (ev, cat) => {
		let id = ev.dataTransfer.getData("id");
		
		let tasks = this.state.tasks.filter((task) => {
			if (task.name == id) {
				task.category = cat;
			}
			return task;
		});
 
		this.setState({
			...this.state,
			tasks
		});
	 }

	 handleClick = (e) =>{
		e.preventDefault();
	 }
 


render(){

	var tasks = {
		wip: [],
		complete: []
	}

	this.state.tasks.forEach ((t) => {
		tasks[t.category].push(
			<div key={t.name} 
				onDragStart = {(e) => this.onDragStart(e, t.name)}
				draggable
				className="draggable"
				style = {{backgroundColor: t.bgcolor}}
			><span><i class="fa fa-trash"></i></span>
				{t.name}
			</div>
		);
	});

    return (

		<div className=" container-fluid container-drag">
			 <div className="row list">
					<h2 className="header">{"Testing"}</h2>
					<div className="col-xs-6">
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">{this.props.taskListName}</span>
					<div className="addTask" onClick={this.handleClick}>
               			 <h6>+Add a Task</h6>
           			 </div>
                    {/*tasks.wip*/}
                </div>
				</div>
				<div className="col-xs-6">
				<div className="droppable"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {/*tasks.complete*/}
				</div>
				</div>
				</div>
            </div>
    )
}

}

export default TaskManager;


/**
 * <div className=" container-fluid container-drag">
			 <div className="row list">
					<h2 className="header"></h2>
					<div className="col-xs-6">
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
				</div>
				<div className="col-xs-6">
				<div className="droppable"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
				</div>
				</div>
				</div>
            </div>
 */
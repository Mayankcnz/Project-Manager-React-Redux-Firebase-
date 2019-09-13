import React, { Component } from 'react'
import {connect} from 'react-redux';
import RenderTasks from './RenderTasks';
import RenderButton from './RenderButton';
import './Test.css'
import $ from 'jquery';
import {addTaskComponentToDatabase} from '../../store/actions/taskActions';
import {deleteTaskComponentToDatabase} from '../../store/actions/taskActions';
import {deleteTaskFromDatabase} from '../../store/actions/taskActions';
import Modal from 'react-awesome-modal';



class RenderTaskList extends Component {
    
    constructor(){
        super();
        this.state = {
            isPrevBtnActive : 'disabled',
            isNextBtnActive : '',
            currentPage : 1,
            listPerPage: 3,
            upperPageBound: 3,
            lowerPageBound: 0,
            pageBound: 3,
            visible: false,
            idToDelete: ''
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
            taskList:nextProps.taskList
        })
    }

    componentDidMount(){
        $("ul li.active").removeClass('active');
        $("ul li#"+this.state.currentPage).addClass('active');

        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }
    updateDimensions = () =>{

        let width = window.innerWidth;
        let listPerPage;

        if(width >= 966){
            listPerPage = 3;
        }else if(width > 610){
            listPerPage = 2;
        }else {
            listPerPage = 1;
        }

        this.setState({
            ...this.state,
            listPerPage : listPerPage
        });
    }
    
    onDragOver = (ev) => {
        ev.preventDefault();
	}
	
	onDrop = (ev, cat, taskID) => {

        let id = ev.dataTransfer.getData("id");
        let onStartTaskid = ev.dataTransfer.getData("taskID");
        let startHeading = ev.dataTransfer.getData("startHeading");

        if(startHeading !== cat){

            console.log("PRINT ALL", id, cat, taskID, onStartTaskid);
            this.props.addToTasks(id, taskID);
            this.props.deleteFromTasks(id, onStartTaskid);
            this.props.updateFirebase(taskID, id);
            this.props.deletefromFirebase(onStartTaskid, id);
            
        }
     }

     onDragStart = (ev, id, startHeading, taskID) => {
         console.log("Dragging",id, "ss");
         console.log(startHeading, "kkk");
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("taskID", taskID);
        ev.dataTransfer.setData("startHeading", startHeading);
    }

    setPrevAndNextBtnClass = (listid) =>{

        let totalPage = Math.ceil(this.props.taskList.length / this.state.listPerPage);
        this.setState({isNextBtnActive: 'disabled'});
        this.setState({isPrevBtnActive: 'disabled'});
        if(totalPage === listid && totalPage > 1){
            this.setState({isPrevBtnActive: ''});
        }
        else if(listid === 1 && totalPage > 1){
            this.setState({isNextBtnActive: ''});
        }
        else if(totalPage > 1){
            this.setState({isNextBtnActive: ''});
            this.setState({isPrevBtnActive: ''});
        }
    }

    handleClick = (event) => {
        let listid = Number(event.target.id);
        this.setState({
          currentPage: listid
        });
        $("ul li.active").removeClass('active');
        $('ul li#'+listid).addClass('active');
        this.setPrevAndNextBtnClass(listid);
      }

    btnNextClick = () =>{
        if((this.state.currentPage +1) > this.state.upperPageBound ){
            this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        }
        let listid = this.state.currentPage + 1;
        $("ul li.active").removeClass('active');
        $('ul li#'+listid).addClass('active');
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }

    btnPrevClick = () =>{
        if((this.state.currentPage -1)%this.state.pageBound === 0 ){
            this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        }
        let listid = this.state.currentPage - 1;
        $("ul li.active").removeClass('active');
        $('ul li#'+listid).addClass('active');
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }

    btnIncrementClick = () =>{
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
  }

  btnDecrementClick = () =>{
    this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
    this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid});
    this.setPrevAndNextBtnClass(listid);
}

openModal = (name, item, identifer) =>{

    console.log(item, "view item");

    const object = {
    };

    const obj = Object.create(object);
    
    if(identifer === "deleteTask")
        obj.isTask = true;
    else 
        obj.isTask = false;
        obj.taskName = name;
    

    obj.id = item.id;
    this.setState({
        visible: true,
        taskdeletion: obj
    })

}

closeModal = ()=>{
    this.setState({
        visible: false
    })
}

delete = () =>{

    console.log("yhis", this.state);
    if(!this.state.taskdeletion.isTask)
        this.props.deleteTaskComponentToDatabase(this.state.taskdeletion.id, this.state.taskdeletion.taskName);
    else
        this.props.deleteTaskFromDatabase(this.state.taskdeletion.id);

    this.closeModal();
    
}

	
    render(){

        const {currentPage, listPerPage, upperPageBound, lowerPageBound, isNextBtnActive, isPrevBtnActive} = this.state;


        const indexOfLastList = currentPage * listPerPage;
        const indexOfFirstList = indexOfLastList - listPerPage;
        const currentLists = this.props.taskList.slice(indexOfFirstList, indexOfLastList);


        

        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(this.props.taskList.length / listPerPage); i++){
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number =>{
            if(number === 1 && currentPage === 1){
                return (
                    <li key = {number}  className = 'active' id={number}><a href="#" id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }else if((number < upperPageBound + 1) && number > lowerPageBound){
                return (
                        <li key={number}  id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });


        let pageIncrementBtn = null; 
        if(pageNumbers.length > upperPageBound){
            pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}>&hellip;</a></li>
        }

        let pageDecrementBtn = null;
        if(lowerPageBound >= 1){
            pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
        }
        let renderPrevBtn = null;
        if(isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
        }
        else{
            renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
        }
        let renderNextBtn = null;
        if(isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
        }
        else{
            renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
        }

            return (
                
                <div className="container-fluid">
                    
                    <ul className="pagination" style={{margin:"auto", width:"100%"}}>
                        {renderPrevBtn}
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        {renderNextBtn}
                    </ul>
                    {currentLists && currentLists.map((task) => {
                            const newTasks = [];

                              console.log(task, "t2");
                        return(

                    
                            <div class="task-container effect" key={task.id} style={{float:"left", marginRight:"20px", display:"inline-block"}}>   
 
                                 <div className="wip"
                                    onDragOver={(e)=>this.onDragOver(e)}
                                    onDrop={(e)=>{this.onDrop(e, task.heading, task.id)}}>
                                         <div class="card inception">
                                         <span id="headingIcon" onClick={() =>this.openModal(null,task,"deleteTask")}><i class="fas fa-trash-alt fa-lg"></i></span>
                                             <h3 class="tab-heading inception">
                                             <div class="text">{task.heading}</div>
                            
                                        </h3>
                                         </div>
                                    

                                     <Modal 
                    visible={this.state.visible}
                    width="300"
                    height="150"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                <div className="modal-header"><label>Do you want to confirm deletion?</label></div>
                <div className="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"  onClick={() => this.closeModal()}>Cancel</button>
                <a  class="btn btn-danger btn-ok" onClick={() => this.delete()}>Delete</a>
            </div></Modal>
       
                                       {task.tasks.forEach ((t) => {
                                         newTasks.push(
                                             <div key={t} id="draggable"
                                                 onDragStart = {(e) => this.onDragStart(e,t,task.heading, task.id)}
                                                 draggable
                                                 >
		                                        <li><span onClick={()=> this.openModal(t,task,"deleteTaskName")}><i class="fas fa-trash-alt"></i></span>{t}</li>
                                             </div>
                                                    );
                                        })} 

                            
                            <RenderTasks task={task} tasks={newTasks}/>    
                            </div>             
                        </div>
                        
                );
                    })}
                        
          {currentLists.length < 3 ?  <RenderButton projectID={this.props.projectID} />: null}

          
    
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        addToTasks: (item, id) => dispatch({
            type: 'ADD_TO_TASK',
            item,
            id
        }),
        deleteFromTasks: (item, id) => dispatch({
            type: 'DELETE_FROM_TASK',
            item,
            id
        }),
        updateFirebase: (id, taskName) => dispatch(addTaskComponentToDatabase(id, taskName)),
        deletefromFirebase: (id, taskName) => dispatch(deleteTaskComponentToDatabase(id, taskName)),
        deleteTaskFromDatabase:(id) => dispatch(deleteTaskFromDatabase(id)),
        deleteTaskComponentToDatabase:(id, taskName) => dispatch(deleteTaskComponentToDatabase(id, taskName))
    }
}

export default connect(null, mapDispatchToProps)(RenderTaskList);
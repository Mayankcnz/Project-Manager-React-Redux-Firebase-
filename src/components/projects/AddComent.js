import React, { Component } from 'react'
import './Comment.css';
import {connect} from 'react-redux'
import {  createComment, createReply } from '../../store/actions/projectActions';
import CommentList from './CommentList';

class AddComment extends Component {

    constructor(){
        super();
        this.state = {
            comment: ''
        }
    }

    handleChange = (e) =>{

        const{id, value} = e.target;

        this.setState({
            [id] : value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if(this.state.comment.length == 0)return;

        const comment = {
            comment: this.state.comment,
            Username: this.props.profile.firstName +" "+this.props.profile.lastName,
            projectId: this.props.id
        }

        this.props.createComment(comment);

    }

    handleReply = (reply, id) =>{

    }

    render(){

        return(

            <div className="container" >
            <div className="callout secondary">
        <h4 className="leave-comment">Add a Comment</h4>
        <form className="post-edit" ref="commentForm" onSubmit={this.handleSubmit}>
          <textarea value={this.state.comment} id={"comment"} placeholder="Add your comment here" onChange={this.handleChange} required style={{resize:"vertical", backgroundColor: "#dadad2" }}/>
          <button id="submit" type="submit" className="btn btn-sm btn-primary">Add Comment</button>
        </form>
      </div>

        <CommentList replies={this.props.replies} comments={this.props.comments}/>
    
    </div>

        )
    }

}

const mapStateToProps = (state) =>{
    return {
        profile: state.firebase.profile,
    }
}

// adds a comment to the comments collections among with the user name, and time
const mapDispatchToProps = (dispatch) =>{
    return {// add proeprties to the props of this component
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
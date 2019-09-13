import React, { Component } from 'react'
import './Comment.css';
import {connect} from 'react-redux'
import {  createComment, createReply } from '../../store/actions/projectActions';
import CommentList from './CommentList';
import { auth } from 'firebase';
import PropTypes from 'prop-types';

class AddComment extends Component {

    constructor(){
        super();
        this.state = {
            comment: '',
            toggleCommentBox: false
        }

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

   /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.toggleCommentBox) {
        this.setState({toggleCommentBox: !this.state.toggleCommentBox})
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

        this.setState({comment: ''})
        this.props.createComment(this.state.comment, this.props.id);

    }

    handleClick = (e) =>{

        e.stopPropagation();

        this.setState({
            toggleCommentBox: true
          })
    }

    render(){

        const {profile} = this.props;
        let userAuthentication_Externally = false;

        if(this.props.profile.isEmpty === true){
            userAuthentication_Externally = true;
        }
        return(
            <div className="container-fluid">
            <form ref={this.setWrapperRef} onClick={this.handleClick} class={this.state.toggleCommentBox ? "comment-container toggled" : "comment-container" }  onSubmit={this.handleSubmit}>
  <div class="meta">
    <img src={userAuthentication_Externally ? this.props.auth.photoURL : this.props.profile.photoURL} alt="" class="avatar" />
    <span class="name">{userAuthentication_Externally ? this.props.auth.displayName : profile.firstName+" "+profile.lastName}</span>
  </div>
  <textarea autoFocus={true} spellCheck={false} class="from-control" value={this.state.comment} id={"comment"} onChange={this.handleChange} required/>
  <span class="placeholder">write a response</span>

  <div class="btns">
     <button id="submit" type="submit" className="btn btn-sm btn-primary">Add Comment</button>
  </div>
</form>
<CommentList auth={this.props.auth} replies={this.props.replies} comments={this.props.comments}/>
</div>


        )
    }

}

const mapStateToProps = (state) =>{
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

// adds a comment to the comments collections among with the user name, and time
const mapDispatchToProps = (dispatch) =>{
    return {// add proeprties to the props of this component
        createComment: (comment, projectID) => dispatch(createComment(comment, projectID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
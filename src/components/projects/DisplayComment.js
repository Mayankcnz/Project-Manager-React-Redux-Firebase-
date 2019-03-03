import React, { Component } from 'react'
import'./DisplayComment.css'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createReply, deleteReplies, deleteComment} from '../../store/actions/projectActions';
import {firestoreConnect} from  'react-redux-firebase';
import RepliesList from './RepliesList';
import PropTypes from 'prop-types'
import moment from 'moment'


class DisplayComment extends Component {

	static propTypes = {
    replies: PropTypes.arrayOf(PropTypes.string)
  }

	constructor(props){
		super(props);


		this.state={
			editMode: false,
			isReplying: false,
			reply: '@'+this.props.comment.Username+': ',
			comment: ''
		}
	
	}

	enterEditMode = () =>{

		if(!this.state.editMode){
			this.setState({
				editMode: true
			})
		}
	}

	renderCommentEdit = () =>{
		return(
			 <form className="post-edit" onSubmit={this.editCommentHandler}>
       <textarea autoFocus={true} ref="editText" required>{this.props.comment.comment}</textarea>
       <button id="submit" type="submit" className="button button-outline comment-button action-button expand-right">Done</button>
     </form>
		)
	}

	editCommentHandler = (e) =>{


		e.preventDefault();


		this.setState({	editMode : false})
	}

	handleChange = (e) =>{
		e.preventDefault();

		this.setState({[e.target.id] : e.target.value})
	}


	renderCommentReply = () =>{

		return(
			<div className="post-edit">
       <textarea autoFocus={true} onChange={this.handleChange} id="reply" value={this.state.reply} placeholder="Add a Reply here" style={{resize:"vertical"}}></textarea>
	   <button onClick={this.editReplyMode} id="cancel" type="submit" value="Cancel" className="btn btn-sm btn-primary">Cancel</button>{' '}
       <button onClick={this.editReplyMode} id="submit" type="submit" className="btn btn-sm btn-primary">Done</button>
     </div>
		)
	}

	enterReplyMode = () =>{
		if(!this.state.isReplying){
			this.setState({
				isReplying: true
			})
		}
	}

	editReplyMode = (e) =>{

		e.preventDefault();

		const{id} = e.target;

		if(id === "submit"){

			let stripped = this.state.reply.substring(this.state.reply.indexOf(":")+1, this.state.reply.length);
			this.props.addReply(stripped, this.props.comment.id, this.props.comment.id);
		}
		this.setState({	isReplying : false})
		
	}

	handleDeleteComment = () =>{

	//	console.log(this.props.comment.id);
		this.props.deleteComment("comments",this.props.comment.id);
		this.props.deleteReply(this.props.comment.id);
	}


render(){

	const {auth} = this.props;
	

	const {replies, comment} = this.props;
	const filteredReplies = replies && replies.filter(reply => reply.replyID== this.props.comment.id);

	console.log(filteredReplies," filtered means");

	let display = false;

	//<i class="fas fa-user fa-4x"></i>
    return(
       <div class="comments-container">

		<ul id="comments-list" class="comments-list">
			<li>
				<div class="comment-main-level">
			
					<div class="comment-avatar"><img src={comment.photoURL} alt=""/></div>
				
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author"><a href={auth.photoURL}>{comment.Username}</a></h6>
							<span id="wordBreak">{moment(this.props.comment.createdAt.toDate()).fromNow()}</span>
              <i class="fas fa-times" onClick={this.handleDeleteComment}></i>
              <i class="far fa-edit" onClick={this.enterEditMode}></i>
							<i class="fa fa-reply" onClick={this.enterReplyMode}></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
							{this.state.editMode ? this.renderCommentEdit() : comment.comment}
							{this.state.isReplying ? this.renderCommentReply() : null}
						</div>
					</div>
				</div>
	
			</li>
		</ul>
		<ul>
		{ <RepliesList replies={filteredReplies} commentID={this.props.comment.id} deleteReply={(collection, id)=>{this.props.deleteComment(collection, id)}} addReply={(comment, id, repliedTo)=>{this.props.addReply(comment, id, repliedTo)}} /> }
		</ul>
	</div>

	)
}


}

const mapStateToProps = (state) =>{
	const replies  = state.firestore.ordered.replies;
	return {
		replies: replies,
		auth: state.firebase.auth
	}

	
}

const mapDispatchToProps = (dispatch) =>{

	return {
		addReply: (reply, id, repliedTo) => dispatch(createReply(reply, id, repliedTo)),
		deleteReply: (parentCommentID) => dispatch(deleteReplies(parentCommentID)),
		deleteComment: (collection, commentID) => dispatch(deleteComment(collection,commentID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComment)



/**
 * 
				<ul class="comments-list reply-list">
					<li>
					
						<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
			
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
								<span>hace 10 minutos</span>
								<i class="fa fa-reply"></i>
								<i class="fa fa-heart"></i>
							</div>
							<div class="comment-content">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
							</div>
						</div>
					</li>

					<li>

						<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
								<span>hace 10 minutos</span>
								<i class="fa fa-reply"></i>
								<i class="fa fa-heart"></i>
							</div>
							<div class="comment-content">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
							</div>
						</div>
					</li>
                </ul>
                

                <li>

					<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>

					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
							<span>hace 10 minutos</span>
							<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
						</div>
					</div>
				</li>
 */
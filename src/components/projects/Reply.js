import React, { Component } from 'react'
import'./DisplayComment.css'
import moment from 'moment'

class Reply extends Component{

	state = {
		isReplying: false,
		isEditing: false,
		reply: '@'+this.props.reply.Username+" ",
		edited: ''
	}

	handleChange = (e) =>{
		e.preventDefault();

		this.setState({[e.target.id] : e.target.value})
	}

	renderCommentEdit = (e) =>{
		return(
			<form className="post-edit" onSubmit={this.editCommentHandler}>
	  <textarea autoFocus={true} ref="editText" required style={{resize:"vertical"}}>{this.props.reply.comment}</textarea>
	  <button id="submit" type="submit" className="button button-outline comment-button action-button expand-right">Done</button>
	</form>
	   )
   }

   editCommentHandler = (e) =>{

	e.preventDefault();
	this.setState({	isEditing : false})
}
	renderCommentReply = (e) =>{
		
		return(
			<div className="post-edit">
       <textarea autoFocus={true} onChange={this.handleChange} id="reply" value={this.state.reply} style={{resize:"vertical"}}></textarea>
	   <button onClick={this.editReplyMode} id="cancel" type="submit" value="Cancel" className="btn btn-sm btn-primary">Cancel</button>{' '}
       <button onClick={this.editReplyMode} id="submit" type="submit" className="btn btn-sm btn-primary">Done</button>
     </div>
		)
	}

	editReplyMode = (e) =>{

		e.preventDefault();

		const{id} = e.target;

		if(id === "submit" && e.target.value.length > 0){
			this.props.addReply(this.state.reply, this.props.reply.replyID, this.props.reply.id);
		}
		this.setState({	isReplying : false})
	}

	enterReplyMode = () =>{
		if(!this.state.isReplying){
			this.setState({
				isReplying: true
			})
		}
	}

	deleteReply = () =>{

		this.props.deleteReply("replies", this.props.reply.id);
	}

	enterEditMode = () =>{
		this.setState({isEditing: true})
	}

	render(){

	const {reply} = this.props;
	
    return (
            <div class="comments-list reply-list">
					<li>
					
						<div class="comment-avatar"><img src={reply.photoURL} alt=""/></div>
			
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name"><a href="http://creaticode.com/blog">{reply.Username}</a></h6>
								<span>{moment(reply.createdAt.toDate()).fromNow()}</span>
								<i class="fas fa-times" onClick={this.deleteReply}></i>
								<i class="far fa-edit" onClick={this.enterEditMode}></i>
								<i class="fa fa-reply" onClick={this.enterReplyMode}></i>
								<i class="fa fa-heart" onClick={null}></i>
							</div>
							<div class="comment-content">
                                    {this.state.isEditing ? this.renderCommentEdit() : reply.comment}
									{this.state.isReplying ? this.renderCommentReply() : null}
                            </div>
						</div>
					</li>
                </div>

   	 )
	}
}

export default Reply;

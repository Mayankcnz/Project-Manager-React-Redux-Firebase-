import React from 'react';
import'./DisplayComment.css'
import moment from 'moment'

const Reply = (props) =>{

	const {reply} = props;
	


    return (
            <div class="comments-list reply-list">
					<li>
					
						<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
			
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name"><a href="http://creaticode.com/blog">{"SFD"}</a></h6>
								<span>{moment(reply.createdAt.toDate()).fromNow()}</span>
								<i class="fas fa-times"></i>
								<i class="far fa-edit" onClick={this.enterEditMode}></i>
								<i class="fa fa-reply"></i>
								<i class="fa fa-heart"></i>
							</div>
							<div class="comment-content">
                                    {reply.reply}
                            </div>
						</div>
					</li>
                </div>


    )


}

export default Reply;

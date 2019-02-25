import React from 'react';
import DisplayComment from './DisplayComment';


const CommentList = (props) =>{
    const { comments, replies } = props;

    console.log(replies,"alll");


   //console.log(filter, "FLITER IN THE FUCXK");


   // console.log(props.replies, "REGATHERING");
    // this function  will return a comment, and it will get called from the parent class for the number of comments we have for a project
    return (
            <div className="container-fluid">
                {comments && comments.map(comment => {

                
                    return (
                        <DisplayComment key={comment.id} comment={comment} replies={replies}
                        />
                    );
                })}

            </div>
    )
}

export default CommentList;
import React, { Component } from 'react';
import Reply from './Reply';

class  RepliesList extends Component{



    render(){
    const { replies, commentID } = this.props;

    console.log(replies, "OMG");




    // this function  will return a comment, and it will get called from the parent class for the number of replies we have for a project
    return (
            <div>
                {replies && replies.map(reply => {

            return(
                   <Reply reply={reply}/>
            );
                })}

            </div>
    )
}
}

export default RepliesList;



/**
 * when we first call an action creator inside a dispatch method from one of the components
 *  we returning a function making the dispatch halt because we are not returning an action anymore
 * inside this function what we can do is do some kind of asychronous call to database and then dispatch the action again.
 *  then once the asynchronous code is been complete then we can carry on with the dispatch and pass in our action
 * @param {} project 
 */

export const createProject = (project) =>{
    return (dispatch, getState, {getFirestore}) =>{

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project});
        }).catch((err) =>{
            dispatch({type: 'CREATE_PROJECT_ERROR', err});
        })

        
    }
};

export const createReply = (reply, id) =>{

    return(dispatch, getState, {getFirestore}) =>{


        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorID = getState().firebase.auth.uid;

        const replyObject = {
            reply: reply,
            Username: profile.firstName+" "+profile.lastName,
            replyID: id
        }
        firestore.collection('replies').add({
            reply: reply,
            Username: profile.firstName+" "+profile.lastName,
            replyID: id,
            createdAt: new Date()
     
   }).then(() =>{
            dispatch({type: 'UPDATE_PROJECT', reply});

        }).catch((err) =>{
            dispatch({type: 'UPDATE_PROJECT_ERROR', err});
        })

    } 

}

export const updateProject = (project, id) =>{ // adding user in because iwe want to be able to know which admin made the change

    return(dispatch, getState, {getFirestore}) =>{


        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorID = getState().firebase.auth.uid;
        firestore.collection('projects').doc(id).update({
            form: project
     
   }).then(() =>{
            dispatch({type: 'UPDATE_PROJECT', project});

        }).catch((err) =>{
            dispatch({type: 'UPDATE_PROJECT_ERROR', err});
        })

    } 

}

export const createComment = (comment) =>{
    return(dispatch, getState, {getFirestore}) =>{

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorID = getState().firebase.auth.uid;
        firestore.collection('comments').add({
            ...comment,
            createdAt: new Date()
        })
        .then(() =>{
            dispatch({type: 'DELETE_PROJECT', comment});

        }).catch((err) =>{
            dispatch({type: 'DELETE_PROJECT_ERROR', err});
        })

        console.log("comment created");
    } 
}

export const deleteReplies = (parentCommentID)=>{

    return(dispatch, getState, {getFirestore}) =>{

        const firestore = getFirestore();
        var batch = firestore.batch();

        var reply_Query= firestore.collection('replies').where('replyID','==',''+parentCommentID);
        reply_Query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        });
    });
}
}


    export const deleteComment = (commentID)=>{

        return(dispatch, getState, {getFirestore}) =>{
    
            const firestore = getFirestore();

            firestore.collection('comments').doc(commentID)
            .delete()
           // .then(() =>{
             //   dispatch({type: 'DELETE_PROJECT', comment});
    
           // }).catch((err) =>{
           //     dispatch({type: 'DELETE_PROJECT_ERROR', err});
           // })
        }
    }
    
    
          //  var reply_Query= firestore.collection('replies').where('replyID','==','RBDsSlEc5JFVGmrsjxfN');
           // reply_Query.get().then(function(querySnapshot) {
           // querySnapshot.forEach(function(doc) {
           // doc.ref.delete();


       // firestore.collection('replies').listDocuments.then(replies =>{
            //replies.map((reply) =>{
                ///if(reply.replyID == 'xfAHDN3szwmFAN5xIHqk'){
                ///    batch.delete(reply);
               /// }
            //})

          //  batch.commit();
        //})

  //  }


export const deleteProject = (project) =>{

    return(dispatch, getState, {getFirestore}) =>{

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorID = getState().firebase.auth.uid;
        firestore.collection('projects').doc(project.id).delete()
        .then(() =>{
            dispatch({type: 'DELETE_PROJECT', project});

        }).catch((err) =>{
            dispatch({type: 'DELETE_PROJECT_ERROR', err});
        })

    } 
}

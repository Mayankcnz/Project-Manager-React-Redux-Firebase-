

const projectReducer = (state = {}, action) =>{
    if(action.type === 'CREATE_PROJECT'){
        console.log(action.project);
        return state;
    }else if (action.type === 'CREATE_PROJECT_ERROR'){
        console.log("create project error", action.err);
        return state;
    }else if(action.type === 'GET_COMMENTS'){
        console.log(action.response,"this is the response");
        return action.response;
    }else if(action.type == 'GET_COMMENTS_ERROR'){
        console.log("comments error");
        return state;
    }
    return state;
}

export default projectReducer;
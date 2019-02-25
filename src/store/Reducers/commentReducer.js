
const addressReducer = (state = {}, action) =>{

    console.log(action.address,"COMMENTS FINALLY WORKING NOW");
        return{
            comments: action.comments
        }

}

export default addressReducer;

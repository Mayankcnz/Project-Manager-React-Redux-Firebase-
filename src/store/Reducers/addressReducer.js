

const addressReducer = (state = {}, action) =>{

    console.log(action.address,"this one");
        return{
            address: action.address
        }

}

export default addressReducer;

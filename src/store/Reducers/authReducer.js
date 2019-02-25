
const initState = {
    authError: null
}

const authReducer = (state = initState, action) =>{

    if(action.type === 'LOGIN_ERROR'){
        return {
            ...state,
            authError: 'Login failed'
        }
    }else if(action.type=== 'LOGIN_SUCCESS'){
        console.log('login success');
        return {
            ...state,
            authError: null
        }
    }else if(action.type === 'SIGNOUT_SUCCESS'){
        console.log("signing out");
    }else if(action.type === 'SIGN_UP_SUCCESS'){
        console.log("signup success");
        return {
            ...state,
            authError: null
        }
    }else if(action.type === 'SIGNUP_ERROR'){
        return{
            ...state,
            authError: action.err.nessage
        }
    }
    return state;
};

export default authReducer;
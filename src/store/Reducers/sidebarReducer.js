const initState = {
    sideBarOpen: false
}

const rootReducer = (state = initState, action) =>{
    if(action.type === 'CHANGE_TOGGLE'){ 
        return{
            ...state,
            sideBarOpen: !state.sideBarOpen
        }
    }
    return state;
}

export default rootReducer;
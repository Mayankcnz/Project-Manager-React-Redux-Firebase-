const initState = {
    isCollapsed: false
}

const rootReducer = (state = initState, action) =>{
    if(action.type === 'COLLAPSE'){ 
        return{
            ...state,
            isCollapsed: !state.isCollapsed
        }
    }
    return state;
}

export default rootReducer;
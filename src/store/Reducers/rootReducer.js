import authReducer from './authReducer';
import projectReducer from './projectReducer';
import sidebarReducer from './sidebarReducer';
import collapseReducer from './collapseReducer';
import {combineReducers} from 'redux' /// combines reducers
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import addressReducer from './addressReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
    auth: authReducer, // authReducer will update information on the auth property inside the state object
    address: addressReducer,
    taskList: taskReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    project: projectReducer,
    sidebar: sidebarReducer,
    collapse: collapseReducer,
});


export default rootReducer;

/**
 * const initState = {
    sideBarOpen: false
}

const rootReducer = (state = initState, action) =>{
    console.log(action);
    if(action.type == 'CHANGE_TOGGLE'){ 
        return{
            ...state,
            sideBarOpen: !state.sideBarOpen
        }
    }
    return state;
}

export default rootReducer;
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // helps us bind redux to react app
import rootReducer from './store/Reducers/rootReducer';
import thunk from 'redux-thunk';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import fbConfig from './config/fbConfig'


// takes a root reducer. each root reducer takes actions 
// will add further root reducers and combine it to one which also combines the actions it takes 
const store = createStore(rootReducer,
        compose(
          applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
          reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true}),
          reduxFirestore(fbConfig) // redux bindings for firestore
        )
      );
// apply thunk as the middleware, applymiddleware can aslso take a list of middleware
// the purpose of applymiddelware is to enchance the functionality. that functionality now being is that
// we can return a function inside our action creators which can then interact with the database

store.firebaseAuthIsReady.then(() =>{ // do not render the application to the dom until the authetication is ready

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
});


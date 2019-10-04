import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, NavLink , withRouter} from 'react-router-dom'; // enables us to use route in the root app component 
import Header from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import { connect } from 'react-redux';  // allows us to connect this component to the redux store by installing a higher order component which in this case
// is a function, which we invoke , which then returns a higher order component (which allows us to connect to the redux store)
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import AddressForm from './components/form/AddressForm';
import PopUp from './components/projects/PopUp';
import { createProject } from './store/actions/projectActions';


class App extends Component {

  constructor(props){
    super(props);
  this.state = {
     notificationHandler : ''
  }
}

sidebarToggleClickHandler = () =>{ // adds this to this class propertiues but ensuries we keep this class scope
  this.props.changeToggle(); // pass the current status of the sidebar to redux
};

backdropClickHandler = () =>{ // handling backdrop separately to sidebar as many use this component again
  this.props.changeToggle(); // pass false because clicking on the window should always close the sidebar
};

notificationHandler = (id) =>{
   <Redirect to="/create" />
  //this.setState({
  //  notificationHandler: projectId
 // })
}

render() {
  

  // we can use routing here on the front end to control the route of the different components and pages to show several different pages to the user
  return (
    <BrowserRouter> 
    <div className="App" style={{height: "100%"}}>
      <Header togglerClickHandler={this.sidebarToggleClickHandler}/>
      <Switch>
        <Route exact path="/"  component={()=> <Dashboard handler={this.notificationHandler} />} />
        <Route path="/project/:id" component={ ProjectDetails } />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path='/create' component={CreateProject} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}
}

// to make changes to the state we will have to interact with the state from this component
// to make a change, i made a method to dispatch an action from this component which contains the type 
// the action will be dispatched to the reducer, which will take the action, checks the type of action and updates the central state

/**
 * 
 * @param {*} dispatch 
 * takes dispatch method as paramter. Mapping dispatch to props, passing this function to reducer through the dispatch method
 * returns an object representing the properties that we are going to map to the props of this component
 */
const mapDispatchToProps = (dispatch) => { 
  return {
    changeToggle: () => { // this function will be attached to our props
      dispatch({ // dispatch an action, with  payload. Dispatch this action whenever we call changeToggle function
        type: 'CHANGE_TOGGLE', 
      })
    }
  }
}



export default connect(null, mapDispatchToProps)(App); 
// invoking the connect function and passing                                  
// mapstatetoprops, which returns a higher order component which wrappers our component by enbaling the ability to connect to the redux stores

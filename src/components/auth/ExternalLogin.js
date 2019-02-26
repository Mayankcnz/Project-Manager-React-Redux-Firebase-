import React, { Component } from "react"
import "./ExternalLogin.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"



class ExternalLogin extends Component {
    state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
      })
    }
  
    render() {
      return (
        <div className="ExternalLogin">
          {this.state.isSignedIn ? (
            <span>
              <div>Signed In!</div>
              <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
              <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
              <img
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
              />
            </span>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      )
    }
  }
  
  export default ExternalLogin
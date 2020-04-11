import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import firebase from "firebase";

export const AuthState = React.createContext();
export const EmailId = React.createContext();

function App() {
  const [authState, setAuthState] = useState(null);
  const [emailId, setEmailId] = useState("a");

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(setAuthState)
    const user=firebase.auth().currentUser;
    if (user != null) {
        const email = user.email
        setEmailId(email);
    }
  },[authState])
  
  return (
    <div className="App">
      <Router>
        <AuthState.Provider value={authState}>
          <EmailId.Provider value={emailId}>
            <Header />
            <Switch>
              <Route path="/" exact strict component={Home} />
              <Route path="/login" exact strict component={Login} />
              <Route path="/signup" exact strict component={SignUp} />
            </Switch>
          </EmailId.Provider>
        </AuthState.Provider>
      </Router>
    </div>
  );
}

export default App;

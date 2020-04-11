import React, { useState, useRef, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import "../Styles/SignUp.css";
import firebase from "../Config/FireBase";

function SignUp() {
  const inputRef = useRef();
  const passRef=useRef()
  const history=useHistory()
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  }, []);

  const emailFocusHandler = () => {
    setIsEmailFocused(true);
  };

  const emailBlurHandler = (event) => {
    if (event.target.value === "") {
      setIsEmailFocused(false);
    }
  };

  const passwordFocusHandler = () => {
    setIsPasswordFocused(true);
  };

  const passwordBlurHandler = (event) => {
    if (event.target.value === "") {
      setIsPasswordFocused(false);
    }
  };

  const confirmPasswordFocusHandler = () => {
    setIsConfirmPasswordFocused(true);
  };

  const confirmPasswordBlurHandler = (event) => {
    if (event.target.value === "") {
      setIsConfirmPasswordFocused(false);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const signupHandler=e=>{
    e.preventDefault()
    if(password===confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(response=>{
        setTimeout(() => {
          history.push('/')
        }, 100);
        
      })
      .catch(error=>{
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 6000);
        setIsEmailFocused(false)
        setIsPasswordFocused(false)
        setIsConfirmPasswordFocused(false)
        setTimeout(() => {
          inputRef.current.focus()
        }, 100);
      })
    }
    else{
      setWrongPassword(true)
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        passRef.current.focus()
      }, 100);
      setTimeout(() => {
        setWrongPassword(false)
      }, 6000);
    }
  }
  const rightInfo = (
    <h5 className="wronginfo">Passwords do not match Please try again</h5>
  );

  const errorMsg=(
    <h5 className="wronginfo">An account exist with this email address</h5>
  )

  return (
    <div className="signup-main-container">
      <title>Sign Up | Todo</title>
      <form className="form">
        <h1 className="title">Sign Up</h1>
        <div className={`div margin ${isEmailFocused ? "focus" : ""}`}>
          <h5>Email</h5>
          <input
            ref={inputRef}
            onFocus={emailFocusHandler}
            onBlur={emailBlurHandler}
            type="email"
            value={email}
            onChange={emailHandler}
            required
            autoCorrect="false"
            spellCheck="false"
          />
        </div>
        <div className={`div margin ${isPasswordFocused ? "focus" : ""}`}>
          <h5>Password</h5>
          <input
            onFocus={passwordFocusHandler}
            onBlur={passwordBlurHandler}
            value={password}
            onChange={passwordHandler}
            ref={passRef}
            required
            minLength="8"
            maxLength="16"
            type="password"
          />
        </div>
        <div className={`div margin1 ${isConfirmPasswordFocused ? "focus" : ""}`}>
          <h5>Confirm Password</h5>
          <input
            onFocus={confirmPasswordFocusHandler}
            onBlur={confirmPasswordBlurHandler}
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            required
            minLength="8"
            maxLength="16"
            type="password"
          />
        </div>
        {
            wrongPassword?rightInfo:null
        }
        {
          error?errorMsg:null
        }
        <Link to="/login" className="registered">
          Already Registered?
        </Link>
        <input onClick={signupHandler} type="submit" className="btn" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUp;

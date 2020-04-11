import React, { useState, useRef, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import avatar from "../Media/avatar.svg";
import firebase from "../Config/FireBase";
import { useHistory } from "react-router-dom";
import {AuthState} from '../App'

function Login() {
  const inputRef = useRef();
  const authState=useContext(AuthState)
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  }, [wrongPassword]);

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
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setWrongPassword(false)
        setTimeout(() => {
          history.push("/");
        }, 100);
      })
      .catch((error) => {
        setEmail("")
        setPassword("");
        setWrongPassword(true);
        setTimeout(() => {
            setWrongPassword(false)
        }, 6000);
      });
  };
  const rightInfo = (
    <h5 className="wronginfo">Wrong email or password Please try again</h5>
  );

  return (
    <div className="login-main-container">
      <title>Login | Todo</title>
      <form className="form">
        <img className="avatar" src={avatar} alt="" />
        <h1 className="title">Welcome</h1>
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
        <div className={`div margin1 ${isPasswordFocused ? "focus" : ""}`}>
          <h5>Password</h5>
          <input
            onFocus={passwordFocusHandler}
            onBlur={passwordBlurHandler}
            value={password}
            onChange={passwordHandler}
            required
            type="password"
          />
        </div>

        {
            wrongPassword?rightInfo:null
        }

        <Link to="/signup" className="registered">
          Not Registered?
        </Link>
        <input
          onClick={loginHandler}
          type="submit"
          className="btn"
          value="Login"
        />
      </form>
    </div>
  );
}

export default Login;

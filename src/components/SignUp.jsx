import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import authServices from '../services/Auth'

import {Message} from "./Message";

const SignUp = () => {
    // const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPass, setConfirmpass] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(0); //default for non-error messages
    const [isUser, setIsUser] = useState(false);
  
    const submitHandler = (event) => {
      event.preventDefault();
      if(password.length < 8)
        {
          setMessage("Password must have a minimum length of 8");
          setMessageType(1);
          setTimeout(() => {
            setMessage(null);
            setMessageType(0)
          }, 5000);
        }
      else if(password !== confirmPass)
        {
          setMessage("Passwords do not match");
          setMessageType(1);
          setTimeout(() => {
            setMessage(null);
            setMessageType(0)
          }, 5000);
        }
        else{
          authServices.signUp({name: username, email: email, password: password}).then(result => {
            console.log(result);
            setIsUser(true);
            // navigate("test");
          }).catch(err => {
            console.log(err);
            setMessage(err.response.data["message"]);
            setMessageType(1) //for error
            setTimeout(() => {
              setMessage(null);
              setMessageType(0);
            }, 5000);
          }
          );
        }
    }
    return(isUser ? 
    <>
      <p>Your account was created Successfully</p>
      <p>Verify your account by clicking on the link sent to {email}</p>
      <p>After verifying, Sign in <Link to="/signin">here</Link></p>
    </> :
      <>
      {/* <Link to={"/test"}>loll</Link> */}
        <Message messageType={messageType} message={message}/>
        <form onSubmit={submitHandler}>
            <label htmlFor = "name">Username:</label>
            <input type="text" id="name" value={username} onChange={e => setUsername(e.target.value)} required/>
            <label htmlFor = "email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label htmlFor = "password">Password:</label>
            <input type="password" id="password" value={password} onChange={e => setpassword(e.target.value)} required/>
            <label htmlFor = "confirmPass">Confirm password:</label>
            <input type="password" id="confirmPass" value={confirmPass} onChange={e => setConfirmpass(e.target.value)} required/>
            <input type="submit"/>
            <p>Already Have an account? <Link to="/signin">Sign In</Link></p>
        </form>
      </>
    )
}

export { SignUp }
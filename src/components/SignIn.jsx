import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {Message} from "./Message";
import authServices from '../services/Auth';

const SignIn = ({setIsAuth}) => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [count, setCount] = useState(null);
  
    const navigate = useNavigate();
    useEffect(() => {
      const timeout = setTimeout(() => {
        if(count === null)
          {
            clearTimeout(timeout);
          }
        else if(count !== 0)
          {
            setCount(count - 1);
            setMessage(`Successful Login. You will be redirected in ${count} seconds`);
    
          }
          else{
              setMessage(null)
              navigate('/home')
          }
        }, 1000);
    } , [count, navigate])
    const submitHandler = (event) => {
        event.preventDefault();
        authServices.signIn({email: email, password: password}).then(result => {
        console.log(result);
        setCount(5);
        setIsAuth(true);
        // setMessage(`Successful Login. You will be redirected in 5 seconds`);
        // setTimeout(() => {
        //       setMessage(null)
        //       navigate('/main')
        // }, 5000);
      }).catch(err => {
        console.log(err);
        setMessage(err.response.data["message"]);
        setMessageType(1);
            setTimeout(() => {
              setMessage(null);
              setMessageType(0)
            }, 5000);
      })
    }
  
    return (
      <>
        <Message messageType={messageType} message={message}/>
        <form onSubmit={submitHandler}>
            <label htmlFor = "email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label htmlFor = "password">Password:</label>
            <input type="password" id="password" value={password} onChange={e => setpassword(e.target.value)} required/>
            <input type="submit"/>
            <p> Forgot Password?<Link to="/forget-password">Reset Password</Link></p>
            <p>Don't Have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </>
    )
  
}

export {SignIn}
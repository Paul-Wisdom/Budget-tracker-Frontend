import { useState } from "react";
import { Link } from "react-router-dom";

import authServices from '../services/Auth';
import { Message } from "./Message";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const submitHandler = (event) => {
        if (password.length < 8)
        {
            setMessage("Password must have a minimum length of 8");
            setMessageType(1);
            setTimeout(() => {
                setMessage(null);
                setMessageType(0)
            }, 5000);
        }
        event.preventDefault();
        authServices.changePassword(email, password).then(result => {
            setPasswordChanged(true);
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

    return (passwordChanged ? 
    <>
        <p>Verify your account by clicking on the link sent to {email} to complete password change</p>
    </>
        :
    <>
        <Message messageType={messageType} message={message}/>
        <form onSubmit={submitHandler}>
            <label htmlFor = "email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label htmlFor = "newPassword">New Password:</label>
            <input type="password" id="newPassword" value={password} onChange={e => setpassword(e.target.value)} required/>
            <input type="submit"/>
            <p> Sign In <Link to="/signin">here</Link></p>
            <p>Don't Have an account? <Link to="/signup">Sign up</Link></p>
        </form>
    </>
    )
}

export {
    ForgetPassword
}
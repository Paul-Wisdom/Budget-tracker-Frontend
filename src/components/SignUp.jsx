import { Link } from "react-router-dom";
import { useState } from "react";

import authServices from "../services/Auth";

import { Message } from "./Message";
import { NavBar } from "./NavBar";

const SignUp = () => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(0); //default for non-error messages
  const [isUser, setIsUser] = useState(false);
  const [val, setVal] = useState("Sign Up");

  const submitHandler = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setMessage("Password must have a minimum length of 8");
      setMessageType(1);
      setTimeout(() => {
        setMessage(null);
        setMessageType(0);
      }, 5000);
    } else if (password !== confirmPass) {
      setMessage("Passwords do not match");
      setMessageType(1);
      setTimeout(() => {
        setMessage(null);
        setMessageType(0);
      }, 5000);
    } else {
      authServices
        .signUp({ name: username, email: email, password: password })
        .then((result) => {
          console.log(result);
          setIsUser(true);
          // navigate("test");
        })
        .catch((err) => {
          console.log(err);
          if (err.message === "Network Error") {
            setMessage("Network Error");
            setMessageType(1);
            setTimeout(() => {
              setMessage(null);
              setMessageType(0);
            }, 5000);
          } else {
            setMessage(err.response.data["message"]);
            setMessageType(1);
            setTimeout(() => {
              setMessage(null);
              setMessageType(0);
            }, 5000);
          }
        });
    }
  };
  return isUser ? (
    <div>
      <NavBar />
      <div className="text-center text-xl text-white flex flex-col bg-gradient-to-r from-green-300 to bg-green-500 w-10/12 mx-auto py-8 rounded-lg">
        <h2 className="text-2xl">CONGRATULATIONS</h2>
        <p>Your account was created Successfully.</p>
        <p>Verify your account by clicking on the link sent to {email}.</p>
        <p>After verifying, You can proceed with signing in.</p>
        <p>Link expires in Six (6) hours</p>
      </div>
    </div>
  ) : (
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row mx-auto w-10/12">
        <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
          <h1 className="text-center md:text-left text-white text-4xl">
            Sign Up
          </h1>
          <span className="my-2 text-center md:text-left">
            Create an account with us
          </span>
        </div>
        <div className=" w-full h-4/5 ">
          <Message messageType={messageType} message={message} />
          <form onSubmit={submitHandler} className=" flex flex-col">
            <div className="flex flex-col p-2">
              <label htmlFor="name">Username:</label>
              <input
                className="form-input"
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="confirmPass">Confirm password:</label>
              <input
                type="password"
                id="confirmPass"
                value={confirmPass}
                onChange={(e) => setConfirmpass(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <input
              type="submit"
              className="bg-green-400 active:bg-green-500 w-16 border-2 text-white rounded-md mx-auto"
              value={val}
            />
            <div className="flex flex-col p-2">
              <p>
                Already Have an account?{" "}
                <Link className="text-green-500" to="/signin">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SignUp };

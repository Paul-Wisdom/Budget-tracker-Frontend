import { useState } from "react";
import { Link } from "react-router-dom";

import authServices from "../services/Auth";
import { Message } from "./Message";
import { NavBar } from "./NavBar";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [val, setVal] = useState("Reset");

  const submitHandler = (event) => {
    if (password.length < 8) {
      setMessage("Password must have a minimum length of 8");
      setMessageType(1);
      setTimeout(() => {
        setMessage(null);
        setMessageType(0);
      }, 5000);
    } else {
      event.preventDefault();
      authServices
        .changePassword(email, password)
        .then((result) => {
          setPasswordChanged(true);
        })
        .catch((err) => {
          console.log(err.message);
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

  return passwordChanged ? (
    <div>
      <NavBar />
      <div className="text-center text-xl text-white flex flex-col bg-gradient-to-r from-green-300 to bg-green-500 w-10/12 mx-auto py-8 rounded-lg">
        <h2 className="text-2xl">Almost There</h2>
        <p>
          Your new password has been saved but before access, Verify your
          account by clicking on the link sent to {email}
        </p>
        <p>Link expires in Six (6) hours</p>
      </div>
    </div>
  ) : (
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row mx-auto w-10/12">
        <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
          <h1 className="text-center md:text-left text-white text-4xl">
            Reset Password
          </h1>
          <span className="my-2 text-center md:text-left">
            Enter your email and new Password
          </span>
        </div>
        <div className=" w-full h-4/5 ">
          <Message messageType={messageType} message={message} />
          <form onSubmit={submitHandler} className=" flex flex-col">
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
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <input
              className="bg-green-400 active:bg-green-500 w-16 border-2 text-white rounded-md mx-auto"
              value={val}
              type="submit"
            />
            <div className="flex flex-col p-2">
              <p>
                Sign In{" "}
                <Link className="text-green-500" to="/signin">
                  here
                </Link>
              </p>
              <p>
                Don't Have an account?{" "}
                <Link className="text-green-500" to="/signup">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ForgetPassword };

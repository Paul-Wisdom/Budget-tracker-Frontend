import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Message } from "./Message";
import { NavBar } from "./NavBar";

import authServices from "../services/Auth";

const SignIn = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [count, setCount] = useState(null);
  const [val, setVal] = useState("Sign In");

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count === null) {
        clearTimeout(timeout);
      } else if (count !== 0) {
        setCount(count - 1);
        setMessage(
          `Successful Login. You will be redirected in ${count} seconds`,
        );
      } else {
        setMessage(null);
        navigate("/home");
      }
    }, 1000);
  }, [count, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    authServices
      .signIn({ email: email, password: password })
      .then((result) => {
        console.log(result);
        setCount(5);
        setIsAuth(true);
        // setMessage(`Successful Login. You will be redirected in 5 seconds`);
        // setTimeout(() => {
        //       setMessage(null)
        //       navigate('/main')
        // }, 5000);
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
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row mx-auto w-10/12">
        <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
          <h1 className="text-center md:text-left text-white text-4xl">
            Sign In
          </h1>
          <span className="my-2 text-center md:text-left">
            Welcome back. Enter your email and password
          </span>
        </div>
        <div className=" w-full h-4/5 ">
          <Message messageType={messageType} message={message} />
          <form onSubmit={submitHandler} className=" flex flex-col">
            <div className="flex flex-col p-2">
              <label htmlFor="email" className="">
                Email:
              </label>
              <input
                // className="outline-none border-b-2 border-green-300 focus:border-green-500 focus:border-b-4  px-2 transition"
                className="form-input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col p-2">
              <label className="" htmlFor="password">
                Password:
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <input
              className="bg-green-400 active:bg-green-500 w-16 border-2 text-white rounded-md mx-auto"
              type="submit"
              value={val}
            />
            <div className="p-2 my-4">
              <p>
                Forgot Password?
                <Link className=" text-green-500" to="/forget-password">
                  Reset Password
                </Link>
              </p>
              <p>
                Don't Have an account?{" "}
                <Link className=" text-green-500" to="/signup">
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

export { SignIn };

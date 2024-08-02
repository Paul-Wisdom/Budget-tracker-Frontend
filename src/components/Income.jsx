import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";


import { Message } from "./Message";
import MenuBar from "./MenuBar";

import budgetServices from "../services/Budget";

const Income = ({ income }) => {
  return (
    <div className="bg-green-500 text-white flex flex-col border-x border-y border-green-500 mr-2 mb-4 rounded-lg md:w-3/5 md:mx-auto">
      <p className="p-2">Name: {income.name} </p>
      <p className="p-2">Amount(N): {income.amount}</p>
    </div>
  );
};
const CreateIncome = ({ isAuth }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createdIncome, setCreatedIncome] = useState(false);
  const [note, setNote] = useState("");
  const [val, setVal] = useState("Create Income");
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);
  const submitHandler = (event) => {
    event.preventDefault();
    setMessage("Creating Income...");
    budgetServices
      .createIncomeTransaction({ name: name, amount: amount, note: note })
      .then((result) => {
        console.log(result);
        setCreatedIncome(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createIncomeHandler = () => {
    setCreatedIncome(false);
    setName("");
    setAmount("");
    setNote("");
  };
  if (createdIncome === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Incomes
          </div>
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500 mt-8 mr-3 md:w-3/5 md:mx-auto rounded-lg">
            <p>Income "{name}" created successfully</p>
            <div className="flex flex-row">
              <Link to="/home" className="text-white underline flex-1">
                Back
              </Link>
              <button
                onClick={createIncomeHandler}
                className="text-white underline"
              >
                Create Income
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row w-screen h-screen ">
      <MenuBar />
      <div className="flex-1 flex flex-col">
        <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
          Incomes
        </div>
        <div className="flex flex-col md:flex-row mx-auto w-10/12 mt-9">
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
            <h1 className="text-center md:text-left text-white text-4xl">
              Create Income
            </h1>
            <div className="my-2 text-center md:text-left mt-5">
              Enter Income name, amount and note
            </div>
          </div>
          <div className=" w-full h-4/5 ">
            <Message message={message} messageType={messageType} />
            <form onSubmit={submitHandler}>
              <div className="flex flex-col p-2">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col p-2">
                <label htmlFor="amount">Amount:</label>
                <input
                  className="form-input"
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col p-2">
                <label htmlFor="note">Note</label>
                <input
                  className="form-input"
                  type="text"
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </div>
              <input
                type="submit"
                value={val}
                className="bg-green-400 active:bg-green-500 w-28 border-2 text-white rounded-md mx-auto"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateIncome, Income };

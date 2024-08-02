import { useQuery } from "./helpers";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";
import { Message } from "./Message";
import ProgressBar from "./ProgressBar";
import MenuBar from "./MenuBar";

import budgetServices from "../services/Budget";

const Expense = ({ expense, budget }) => {
  const navigate = useNavigate();
  const handler = () => {
    navigate(`/get-expense?expense_id=${expense.id}&budget_id=${budget.id}`);
  };
  return (
    <div className="md:mx-auto md:w-3/5 my-2 min-h-20 border-x-2 border-y-2 border-green-500 flex flex-row mr-4">
      <div className="flex flex-col flex-1">
        <div className="flex">
          <p className="flex-1 text-xl ml-4">{expense.name}</p>
          <p className=" text-gray-600">
            N{expense.amountSpent} of N{expense.amountBudgeted}
          </p>
        </div>
        <div className="ml-2 min-w-full bg-white border rounded-md">
          <ProgressBar
            spent={expense.amountSpent}
            budgeted={expense.amountBudgeted}
          />
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="mr-1 ml-4 bg-green-400 active:bg-green-500 w-16 h-7 border-2 text-white rounded-md"
          onClick={handler}
        >
          View
        </button>
      </div>
    </div>
  );
};

const CreateExpense = () => {
  const [name, setName] = useState("");
  const [amountBudgeted, setAmountBudgeted] = useState("");
  const [createdExpense, setCreatedExpense] = useState(false);
  const [val, setval] = useState("Create Expense");
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);
  
  const submitHandler = (event) => {
    event.preventDefault();
    setMessage("Creating Expense...")
    budgetServices
      .createExpense({ name: name, amountBudgeted: amountBudgeted })
      .then((result) => {
        console.log(result);
        setCreatedExpense(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createExpenseHandler = () => {
    setCreatedExpense(false);
    setName("");
    setAmountBudgeted("");
  };

  if (createdExpense === true) {
    return (
      <div className="flex flex-row w-screen h-screen">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500 mt-8 mr-3 md:w-3/5 md:mx-auto rounded-lg">
            <p>Expense "{name}" created successfully</p>
            <div className="flex flex-row">
              <Link
                to="/home"
                className="flex-1 text-white underline active:text-green-600"
              >
                Back
              </Link>
              <button
                className="text-white underline active:text-green-600"
                onClick={createExpenseHandler}
              >
                Create Expense
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
          Expenses
        </div>
        <div className="flex flex-col md:flex-row mx-auto w-10/12 mt-9">
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
            <h1 className="text-center md:text-left text-white text-4xl">
              Create an Expense
            </h1>
            <span className="my-2 text-center md:text-left">
              Enter expense name and amount budgeted
            </span>
          </div>
          <div className=" w-full h-4/5">
            <Message message={message} messageType={messageType}/>
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
                <label htmlFor="amountBudgeted">Amount Budgeted:</label>
                <input
                  className="form-input"
                  type="number"
                  id="amountBudgeted"
                  value={amountBudgeted}
                  onChange={(e) => setAmountBudgeted(e.target.value)}
                  required
                />
              </div>
              <div className="min-w-full">
                <input
                  type="submit"
                  className="bg-green-400 active:bg-green-500 w-28 border-2 text-white rounded-md mx-auto"
                  value={val}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const GetExpense = ({ isAuth }) => {
  const [isloading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [amountBudgeted, setAmountBudgeted] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [edittedExpense, setEdittedExpense] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [createdtransaction, setCreatedTransaction] = useState(false);
  const [val, setVal] = useState(["Edit Expense", "Create Transaction"]);
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const query = useQuery();
  const expense_id = query.get("expense_id");
  // console.log(expense_id);
  const budget_id = query.get("budget_id");
  // console.log(budget_id);

  useEffect(() => {
    budgetServices
      .getExpense(budget_id, expense_id)
      .then((expense) => {
        expense = expense.data[0];
        setExpense(expense);
        console.log(expense);
        setIsLoading(false);
        setName(expense.name);
        setAmountBudgeted(expense.amountBudgeted);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      });
  }, [budget_id, expense_id, navigate]);

  const editHandler = (event) => {
    event.preventDefault();
    setMessage("Editting Expense ...");
    budgetServices
      .editExpense(name, amountBudgeted, expense.id, budget_id)
      .then((result) => {
        console.log(result);
        setEdittedExpense(true);
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      });
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    console.log(budget_id);
    budgetServices
      .deleteExpense(expense.id, budget_id)
      .then((result) => {
        console.log(result);
        setDeleteMessage(`Deleted expense "${name}" successfullly`);
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setDeleteMessage(
            "You cannot delete this expense as you have carried out transactions with it",
          );
          setTimeout(() => {
            setDeleteMessage(null);
          }, 5000);
        }
      });
  };

  const expenseTransactionHandler = (event) => {
    event.preventDefault();
    setMessage("Creating Expense Transaction...")
    budgetServices
      .createExpenseTransaction({
        expense_id: expense_id,
        amount: amount,
        note: note,
      })
      .then((result) => {
        console.log(result);
        setCreatedTransaction(true);
        setCreateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isloading === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <>
            <LoadingSpinner />
          </>
        </div>
      </div>
    );
  }
  if (editMode === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className="flex flex-col md:flex-row mx-auto w-10/12 mt-9">
            <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
              <h1 className="text-center md:text-left text-white text-4xl">
                Edit {name} expense
              </h1>
              <div className="my-2 text-center md:text-left mt-5">
                Enter expense name and/or amount budgeted
              </div>
            </div>
            <div className=" w-full h-4/5 ">
              <Message message={message} messageType={messageType} />
              <form onSubmit={editHandler}>
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
                  <label htmlFor="amountBudgeted">Amount Budgeted:</label>
                  <input
                    className="form-input"
                    type="number"
                    id="amountBudgeted"
                    value={amountBudgeted}
                    onChange={(e) => setAmountBudgeted(e.target.value)}
                    required
                  />
                </div>
                <div className="min-w-full">
                  <input
                    type="submit"
                    className="bg-green-400 active:bg-green-500 w-28 border-2 text-white rounded-md mx-auto"
                    value={val[0]}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (edittedExpense === true) {
    // console.log('here')
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500 mt-8 mr-3 md:w-3/5 md:mx-auto rounded-lg">
            <p>Expense "{name}" was editted successfully</p>
            <Link to="/home" className="text-white underline">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (deleteMessage) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500 mt-8 mr-3 md:w-3/5 md:mx-auto rounded-lg">
            <p>{deleteMessage}</p>
            <Link to="/home" className="text-white underline">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (createMode === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className="flex flex-col md:flex-row mx-auto w-10/12 mt-9">
            <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500">
              <h1 className="text-center md:text-left text-white text-4xl">
                Create a transaction on expense '{name}'
              </h1>
              <div className="my-2 text-center md:text-left mt-5">
                Enter amount spent and note
              </div>
            </div>
            <div className=" w-full h-4/5 ">
              <h2 className="text-2xl text-black text-center">
                {expense.name}
              </h2>
              <form onSubmit={expenseTransactionHandler}>
                <Message message={message} messageType={messageType} />
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
                  <label htmlFor="note">Note:</label>
                  <input
                    className="form-input"
                    type="text"
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />
                </div>
                <div className="min-w-full">
                  <input
                    type="submit"
                    className="bg-green-400 active:bg-green-500 w-28 border-2 text-white rounded-md mx-auto"
                    value={val[1]}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (createdtransaction === true) {
    // console.log('here')
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Expenses
          </div>
          <div className=" p-2 w-full bg-gradient-to-r from-green-300 to-green-500 mt-8 mr-3 md:w-3/5 md:mx-auto rounded-lg">
            <p>Transaction on Expense "{name}" was created successfully</p>
            <Link to="/home" className="text-white underline">
              Back
            </Link>
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
          Expenses
        </div>
        <div className="border-x-4 border-y-4 border-green-500 md:w-3/5 md:mx-auto mt-8 p-3 rounded-lg mr-4">
          <h2 className="text-center text-2xl text-black">{expense.name}</h2>
          <div className="flex flex-row">
            <h3 className="flex-1">Amount Budgeted (N): </h3>
            <p className="text-green-500"> {expense.amountBudgeted}</p>
          </div>
          <div className="flex flex-row">
            <h3 className="flex-1">Amount Spent (N): </h3>
            <p className="text-red-500">{expense.amountSpent}</p>
          </div>
          <div className="flex flex-row mt-10 mx-auto">
            <button
              className=" bg-green-500 active:bg-green-600 w-31 h-7 sm:max-md:h-24 border-2 text-white rounded-md"
              onClick={() => {
                setCreateMode(true);
              }}
            >
              Create Transaction
            </button>
            <button
              className=" bg-green-500 active:bg-green-600 w-16 h-7 border-2 text-white rounded-md"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 active:bg-red-600 w-20 h-7 border-2 text-white rounded-md"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GetExpense, CreateExpense, Expense };

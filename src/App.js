import './App.css';
import { useState, useEffect } from 'react';
import  authServices from  './services/Auth';
import budgetServices from "./services/Budget";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useLocation, Link  } from 'react-router-dom';

const ProtectedRoute = ({isAuth, children}) => {
  // const navigate = useNavigate();
  return isAuth ? children : < Navigate to="/signin"/>
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Messsage = ({message, messageType}) => {
  if(message)
    {
      return (<p>{message}</p>)
    }
}

// const SignUpSuccess = () => {

// }
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
      <Messsage messageType={messageType} message={message}/>
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
      </form>
    </>
  )
}

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
      <Messsage messageType={messageType} message={message}/>
      <form onSubmit={submitHandler}>
          <label htmlFor = "email">Email:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <label htmlFor = "password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setpassword(e.target.value)} required/>
          <input type="submit"/>
      </form>
    </>
  )

}
const Expense = ({expense, budget}) => {
  const navigate = useNavigate();
  const handler = () => {
    navigate(`/get-expense?expense_id=${expense.id}&budget_id=${budget.id}`);
  }
  return (
    <div>
      <p>{expense.name} {expense.amountSpent} /{expense.amountBudgeted} <button onClick={handler}>View</button></p>
    </div>
  )
}

const Income = ({income}) => {

  return(
    <div>
      <p>{income.name} {income.amount}</p>
    </div>
  )
} 

const Budget = () => {
  const [isloading, setIsLoading] = useState(true);
  const [currentBudgetExists, setCurrentBudgetExists] = useState(null);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [budget, setBudget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    budgetServices.getCurrentBudget().then(result => {
      console.log(result);
      console.log(result.data.length);
      if(result.data.length === 0)
        {
          setCurrentBudgetExists(false);
          setIsLoading(false);
        }
        else{
          setBudget(result.data[0]);
          const b = result.data[0];
          console.log(b.id);
          //get expenses and display
          setCurrentBudgetExists(true);
          budgetServices.getAllExpenses(b.id).then(expenses => {
            setExpense(expenses.data);
            console.log(expenses);
            return budgetServices.getAllIncomes(b.id);
          }).then(incomes => {
            console.log(incomes);
            setIncome(incomes.data);
            setIsLoading(false);
          }).catch(err => {
            console.log(err);
          });
        }
    }).catch(err => {
      console.log(err);
    })
  }, []);

const createBudgetHandler = () => {
  budgetServices.createBudget().then(budget => {
    console.log(budget);
    setCurrentBudgetExists(true);
    setBudget(budget)
  }).catch(err => {
    console.log(err);
  })
}

const addExpenseHandler = () => {
  navigate('/create-expense');
}

const addIncomeHandler = () => {
  navigate('/create-income');
}

  if (isloading === true)
    {
      return (<>Loading...</>)

    }
  if (currentBudgetExists === false)
    {
      return(
        <>
          <p>No current budget</p>
          <button onClick={createBudgetHandler}>Create Budget</button>
          <Link to = "/signout">sign out</Link>
        </>
      )
    }
      console.log(expense);
      console.log(income);
      console.log(budget)
  return(
  <>
    <h2>{budget.month}</h2>
    <h3>Expenses</h3>
    
    {expense.length > 0 ? expense.map(e => {
      return <Expense key={e.id} expense={e} budget={budget}/>
    }) : <p>No expense yet</p>}
    <button onClick={addExpenseHandler}>Add Expense</button>
    <h3>Incomes</h3>
    {income.length > 0 ? income.map(i => {
      return <Income key={i.id} income={i} />
    }) : <p>No Income yet</p>}
    <button onClick={addIncomeHandler}>Add Income</button>
    <Link to = "/signout">sign out</Link>
  </>
    
  );
}

const SignOut = ({setIsAuth}) => { 
  useEffect(() => {
    authServices.signOut().then(result => {
      console.log(result);
      setIsAuth(false);
      // navigate('/signin')
    }).catch(err => {
      console.log(err);
    })
  }, [])

    return(
      <Navigate to = "/signin" />
    )
}


const CreateExpense = () => {
  const [name, setName] = useState('');
  const [amountBudgeted, setAmountBudgeted] = useState('');
  const [createdExpense, setCreatedExpense] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    budgetServices.createExpense({name: name, amountBudgeted: amountBudgeted}).then(result => {
      console.log(result)
      setCreatedExpense(true);
    }).catch(err => {
      console.log(err);
    })
  }
  
  const createExpenseHandler = () => {
    setCreatedExpense(false);
    setName('');
    setAmountBudgeted('');
  }

  if (createdExpense === true)
    {
      return(
        <>
          <p>Expense "{name}" created successfully</p>
          <Link to="/home">Back</Link>
          <button onClick={createExpenseHandler}>Create Expense</button>
        </>
      )
    }
  return (
    <>
      <form onSubmit={submitHandler}>
          <label htmlFor = "name">Name:</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
          <label htmlFor = "amountBudgeted">Amount Budgeted:</label>
          <input type="number" id="amountBudgeted" value={amountBudgeted} onChange={e => setAmountBudgeted(e.target.value)} required/>
          <input type="submit"/>
      </form>
    </>
  )
}

const GetExpense = () => {
  const [isloading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [amountBudgeted, setAmountBudgeted] = useState('');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [edittedExpense, setEdittedExpense] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [createdtransaction, setCreatedTransaction] = useState(false);


  const navigate = useNavigate(); 

  const query = useQuery();
  const expense_id = query.get('expense_id');
  // console.log(expense_id);
  const budget_id = query.get('budget_id');
  // console.log(budget_id);

  useEffect(() => {
    budgetServices.getExpense(budget_id, expense_id).then((expense) => {
      expense = expense.data[0];
      setExpense(expense);
      console.log(expense);
      setIsLoading(false);
      setName(expense.name);
      setAmountBudgeted(expense.amountBudgeted)
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const editHandler = (event) => {
    event.preventDefault();
    budgetServices.editExpense(name, amountBudgeted, expense.id, budget_id).then(result => {
      console.log(result);
      setEdittedExpense(true);
      setEditMode(false);
    }).catch(err => {
      console.log(err);
    })
  }
  
  const deleteHandler = (event) => {
    event.preventDefault();
    console.log(budget_id);
    budgetServices.deleteExpense(expense.id, budget_id).then(result => {
      console.log(result);
      setDeleteMessage(`Deleted expense "${name}" successfullly`)
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    }).catch(err => {
      if(err.response.status  == 403)
        {
          setDeleteMessage("You cannot delete this expense as you have carried out transactions with it")
          setTimeout(() => {
            setDeleteMessage(null);
          }, 5000);
        }
    })
  }

  const expenseTransactionHandler = (event) => {
    event.preventDefault();
    budgetServices.createExpenseTransaction({expense_id: expense_id, amount: amount, note: note}).then(result => {
      console.log(result);
      setCreatedTransaction(true);
      setCreateMode(false);
    }).catch(err => {
      console.log(err);
    })
  }

  if(isloading === true)
    {
      return (
        <>Loading...</>
      )
    }
  if(editMode === true)
    {
      
      return(
        <>
          <form onSubmit={editHandler}>
            <label htmlFor = "name">Name:</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
            <label htmlFor = "amountBudgeted">Amount Budgeted:</label>
            <input type="number" id="amountBudgeted" value={amountBudgeted} onChange={e => setAmountBudgeted(e.target.value)} required/>
            <input type="submit"/>
        </form>
        </>
      )
    }
  if (edittedExpense === true)
    {
      // console.log('here')
      return(
        <>
          <p>Expense "{name}" was editted successfully</p>
          <Link to="/home">Back</Link>
        </>
      )
    }
  if (deleteMessage)
    {
      return(
        <>{deleteMessage}</>
      )
    }
  if (createMode === true)
    {
      return(
        <>
          <h2>{expense.name}</h2>
          <form onSubmit={expenseTransactionHandler}>
            <label htmlFor = "amount">Amount:</label>
            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required/>
            <label htmlFor = "note">Note:</label>
            <input type="text" id="note" value={note} onChange={e => setNote(e.target.value)} required/>
            <input type="submit"/>
          </form>
        </>
      )
    }
  if (createdtransaction === true)
    {
      // console.log('here')
      return(
        <>
          <p>Transaction on Expense "{name}" was created successfully</p>
          <Link to="/home">Back</Link>
        </>
      )
    }
  return(
    <>
      <h2>{expense.name}</h2>
      <h3>Amount Budgeted: </h3><p> {expense.amountBudgeted}</p>
      <h3>Amount Spent: </h3><p>{expense.amountSpent}</p>
      <button onClick={() => {setCreateMode(true)}}>Create Transaction</button>
      <button onClick={() => {setEditMode(true)}}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </>
  )
}

const CreateIncome = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [createdIncome, setCreatedIncome] = useState(false);
  const [note, setNote] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();
    budgetServices.createIncomeTransaction({name: name, amount: amount, note: note}).then(result => {
      console.log(result)
      setCreatedIncome(true);
    }).catch(err => {
      console.log(err);
    })
  }

  const createIncomeHandler = () => {
    setCreatedIncome(false);
    setName('');
    setAmount('');
    setNote('')
  }
  if (createdIncome === true)
    {
      return(
        <>
          <p>Income "{name}" created successfully</p>
          <Link to="/home">Back</Link>
          <button onClick={createIncomeHandler}>Create Expense</button>
        </>
      )
    }
  return(
    <>
      <form onSubmit={submitHandler}>
          <label htmlFor = "name">Name:</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
          <label htmlFor = "amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required/>
          <label htmlFor='note'>Note</label>
          <input type='text' id='note' value={note} onChange={e => setNote(e.target.value)} required />
          <input type="submit"/>
      </form>      
    </>
  )
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  // const navigate = useNavigate();
  useEffect(() => {
    authServices.isLoggedIn().then(result => {
      console.log(result);
      setIsAuth(true);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }, [])

  if (isloading)
    {
      return <>Loading ...</>
    }
  return (
    // <SignUp />
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element = { <SignIn setIsAuth={setIsAuth} /> }/>
        <Route path='/signout' element = { 
          <ProtectedRoute isAuth={isAuth} >
            <SignOut setIsAuth = {setIsAuth}/>
          </ProtectedRoute>
        } />
        <Route path='/home' element = {
          <ProtectedRoute isAuth={isAuth} >
            <Budget />
          </ProtectedRoute>
        }/>
        <Route path='/create-expense' element = {
          <ProtectedRoute isAuth={isAuth} >
            <CreateExpense />
          </ProtectedRoute>
        }/>
        <Route path='/get-expense' element = {
          <ProtectedRoute isAuth={isAuth} >
            <GetExpense />
          </ProtectedRoute>
        }/>
        <Route path='/create-income' element = {
          <ProtectedRoute isAuth={isAuth} >
            <CreateIncome />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

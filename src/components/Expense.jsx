import {useQuery} from './helpers';

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { NavBar } from './NavBar';

import budgetServices from '../services/Budget'

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

const CreateExpense = ({isAuth}) => {
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
            <NavBar isAuth={isAuth}/>
            <p>Expense "{name}" created successfully</p>
            <Link to="/home">Back</Link>
            <button onClick={createExpenseHandler}>Create Expense</button>
          </>
        )
      }
    return (
      <>
        <NavBar isAuth={isAuth}/>
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
  
const GetExpense = ({isAuth}) => {
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
        if(err.response.status === 401)
          {
            navigate('/signin');
          }
      })
    }, [budget_id, expense_id, navigate]);
  
    const editHandler = (event) => {
      event.preventDefault();
      budgetServices.editExpense(name, amountBudgeted, expense.id, budget_id).then(result => {
        console.log(result);
        setEdittedExpense(true);
        setEditMode(false);
      }).catch(err => {
        console.log(err);
        if(err.response.status === 401)
          {
            navigate('/signin');
          }
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
        if(err.response.status  === 403)
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
          <>
            <NavBar isAuth={isAuth}/>
            <>Loading...</>
          </>
        )
      }
    if(editMode === true)
      {
        
        return(
          <>
            <NavBar isAuth={isAuth}/>
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
            <NavBar isAuth={isAuth}/>
            <p>Expense "{name}" was editted successfully</p>
            <Link to="/home">Back</Link>
          </>
        )
      }
    if (deleteMessage)
      {
        return(
          <>
            <NavBar isAuth={isAuth}/>
            {deleteMessage}
          </>
        )
      }
    if (createMode === true)
      {
        return(
          <>
            <NavBar isAuth={isAuth}/>
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
            <NavBar isAuth={isAuth}/>
            <p>Transaction on Expense "{name}" was created successfully</p>
            <Link to="/home">Back</Link>
          </>
        )
      }
    return(
      <>
        <NavBar isAuth={isAuth}/>
        <h2>{expense.name}</h2>
        <h3>Amount Budgeted: </h3><p> {expense.amountBudgeted}</p>
        <h3>Amount Spent: </h3><p>{expense.amountSpent}</p>
        <button onClick={() => {setCreateMode(true)}}>Create Transaction</button>
        <button onClick={() => {setEditMode(true)}}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </>
    )
}

export {
    GetExpense,
    CreateExpense,
    Expense
}
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import budgetServices from '../services/Budget'
import {Income} from './Income'
import {Expense} from './Expense'
import { SideBar } from "./SideBar";

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
              if(err.response.status === 401)
                {
                  navigate('/signin');
                }
            });
          }
      }).catch(err => {
        console.log(err);
      })
    }, [navigate]);
  
    const createBudgetHandler = () => {
        budgetServices.createBudget().then(budget => {
        console.log(budget);
        setCurrentBudgetExists(true);
        setBudget(budget)
        }).catch(err => {
        console.log(err);
    })}
  
    const addExpenseHandler = () => {
        navigate('/create-expense');
    }
  
    const addIncomeHandler = () => {
        navigate('/create-income');
    }
  
    if (isloading === true)
    {
        return (
      <>
        <SideBar />
        <p>Loading...</p>
      </>)
  
    }
    if (currentBudgetExists === false)
    {
        return(
          <>
            <SideBar />
            <p>No current budget</p>
            <button onClick={createBudgetHandler}>Create Budget</button>
            {/* <Link to = "/signout">sign out</Link> */}
          </>
        )
    }
        console.log(expense);
        console.log(income);
        console.log(budget)
    return(
    <>
    <SideBar />
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
    
    {/* <Link to = "/signout">sign out</Link> */}
    </>
    );
}

export { Budget }
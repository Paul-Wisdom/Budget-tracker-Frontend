import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import budgetServices from "../services/Budget";
import { Income } from "./Income";
import { Expense } from "./Expense";
import LoadingSpinner from "./LoadingSpinner";
import MenuBar from "./MenuBar";

const Budget = () => {
  const [isloading, setIsLoading] = useState(true);
  const [currentBudgetExists, setCurrentBudgetExists] = useState(null);
  const [expense, setExpense] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);
  const [budget, setBudget] = useState(null);
  const [total, setTotal] = useState(null);
  const [viewAllExpenses, setViewAllExpenses] = useState(false);
  const [viewAllIncomes, setViewAllIncomes] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    budgetServices
      .getCurrentBudget()
      .then((result) => {
        console.log(result);
        console.log(result.data.length);
        if (result.data.length === 0) {
          setCurrentBudgetExists(false);
          setIsLoading(false);
        } else {
          setBudget(result.data[0]);
          const b = result.data[0];
          console.log(b.id);
          //get expenses and display
          setCurrentBudgetExists(true);
          budgetServices
            .getAllExpenses(b.id)
            .then((expenses) => {
              setExpense(expenses.data);
              setAllExpenses(expenses.data.reverse());
              console.log(expenses);
              return budgetServices.getAllIncomes(b.id);
            })
            .then((incomes) => {
              console.log(incomes);
              setIncome(incomes.data);
              setAllIncomes(incomes.data.reverse());
              return budgetServices.getTotal(b.id);
            })
            .then((total) => {
              console.log("totals", total);
              setTotal(total.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 401) {
                navigate("/signin");
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401)
          {
            navigate('/signIn')
          }
      });
  }, [navigate]);

  useEffect(() => {
    if(!viewAllExpenses)
    {
      setExpense(allExpenses.slice(0, 5))
    }
    else{
      setExpense(allExpenses)
    }

    if(!viewAllIncomes)
    {
      setIncome(allIncomes.slice(0, 5))
    }
    else{
      setIncome(allIncomes)
    }
  }, [viewAllExpenses, allExpenses, viewAllIncomes, allIncomes])

  const createBudgetHandler = () => {
    budgetServices
      .createBudget()
      .then((budget) => {
        console.log(budget);
        setCurrentBudgetExists(true);
        setBudget(budget);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401)
        {
          navigate('/signIn')
        }
      });
  };

  const addExpenseHandler = () => {
    navigate("/create-expense");
  };

  const addIncomeHandler = () => {
    navigate("/create-income");
  };

  if (isloading === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar active={0} />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Budget
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (currentBudgetExists === false) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar active={0} />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            {" "}
            Budget
          </div>
          <div className="mx-auto mt-6">
            <h1 className="text-green-500 text-2xl">No current budget</h1>
          </div>
          <div className="mx-auto">
            <button
              className="bg-green-400 active:bg-green-500 w-32 h-7 border-2 text-white rounded-md"
              onClick={createBudgetHandler}
            >
              Create Budget
            </button>
          </div>
        </div>
        {/* <Link to = "/signout">sign out</Link> */}
      </div>
    );
  }

  return (
    <div className="flex flex-row w-screen h-screen ">
      <MenuBar active={0} />
      <div className="flex-1 flex flex-col">
        <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
          {budget.month}'s Budget
        </div>

        <div className="mt-2 md:w-3/5 md:mx-auto sm:max-md:mr-4">
          <h2 className="text-center text-2xl">SUMMARY</h2>
          <div className="flex flex-col mr-4">
            <div className="flex flex-row">
              <p className="flex-1">Total Expenses Budgeted:</p>
              <p>N {total.totalAmountBudgeted}</p>
            </div>
            <div className="flex flex-row">
              <p className="flex-1">Total Spent:</p>
              <p className="text-red-500">N {total.totalAmountSpent}</p>
            </div>
            <div className="flex flex-row">
              <p className="flex-1">Total Income:</p>
              <p className="text-green-500">N {total.totalIncome}</p>
            </div>
            <div className="flex flex-row">
              <p className="flex-1">Net:</p>
              {total.totalIncome >= total.totalAmountSpent ? (
                <p className="text-green-500">
                  N {Number(total.totalIncome) - Number(total.totalAmountSpent)}
                </p>
              ) : (
                <p className="text-red-500">
                  -N{" "}
                  {Number(total.totalAmountSpent) - Number(total.totalIncome)}
                </p>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-center text-2xl text-green-500">Expenses</h3>
        {allExpenses.length > 0 ? (
          expense.map((e) => {
            return <Expense key={e.id} expense={e} budget={budget} />;
          })
        ) : (
          <p className="text-center text-xl">No expense yet</p>
        )}
        {expense.length <= 5 && allExpenses.length > 5? <button className="text-green-500 border-b-2 border-green-500 text-left w-20 mb-3" onClick={() => setViewAllExpenses(true)}>View more</button>: <p></p>}
        {expense.length > 5 ? <button className="text-green-500 border-b-2 border-green-500 text-left w-20 mb-3" onClick={() => setViewAllExpenses(false)}>View less</button>: <p></p>}
        <div className="mx-auto">
          <button
            className="bg-green-400 active:bg-green-500 w-32 h-7 border-2 text-white rounded-md"
            onClick={addExpenseHandler}
          >
            Add Expense
          </button>
        </div>

        <h3 className="text-center text-2xl text-green-500 mt-4">Incomes</h3>
        {income.length > 0 ? (
          income.map((i) => {
            return <Income key={i.id} income={i} />;
          })
        ) : (
          <p className="text-center text-xl">No Income yet</p>
        )}
        {income.length <= 5 && allIncomes.length > 5? <button className="text-green-500 border-b-2 border-green-500 text-left w-20 mb-3" onClick={() => setViewAllIncomes(true)}>View more</button>: <p></p>}
        {income.length > 5 ? <button className="text-green-500 border-b-2 border-green-500 text-left w-20 mb-3"  onClick={() => setViewAllIncomes(false)}>View less</button>: <p></p>}
        <div className="mx-auto">
          <button
            className="bg-green-400 active:bg-green-500 w-32 h-7 border-2 text-white rounded-md"
            onClick={addIncomeHandler}
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
};

export { Budget };

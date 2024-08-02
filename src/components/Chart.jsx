import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

import budgetServices from "../services/Budget";

import LoadingSpinner from "./LoadingSpinner";
import MenuBar from "./MenuBar";

import {
  LinearScale,
  BarElement,
  ArcElement,
  Chart,
  CategoryScale,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
Chart.register(
  LinearScale,
  BarElement,
  ArcElement,
  CategoryScale,
  Legend,
  Tooltip,
  Title,
);

const createChartOptions = (text, chartType) => {
  if (chartType !== 2) {
    return {
      animation: false,
      plugins: {
        title: {
          display: true,
          text: text,
        },
      },
    };
  }
  return {
    animation: false,
    plugins: {
      title: {
        display: true,
        text: text,
      },
      legend: {
        display: false,
      },
    },
  };
};

const ExpenseBudgetedChart = ({
  expenseBudgetedChartType,
  setExpenseBudgetedChartType,
  expenseBudgetedChartData,
}) => {
  const toggleHandler = () => {
    const incrementedType = expenseBudgetedChartType + 1;
    if (expenseBudgetedChartType === 2) {
      setExpenseBudgetedChartType(0);
    } else {
      setExpenseBudgetedChartType(incrementedType);
    }
  };

  if (expenseBudgetedChartType === 0) {
    return (
      <>
        <Pie
          data={expenseBudgetedChartData}
          options={createChartOptions(
            "Amount Budgeted",
            expenseBudgetedChartType,
          )}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else if (expenseBudgetedChartType === 1) {
    return (
      <>
        <Doughnut
          data={expenseBudgetedChartData}
          options={createChartOptions(
            "Amount Budgeted",
            expenseBudgetedChartType,
          )}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else {
    return (
      <>
        <Bar
          data={expenseBudgetedChartData}
          options={createChartOptions(
            "Amount Budgeted",
            expenseBudgetedChartType,
          )}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  }
};

const ExpenseSpentChart = ({
  expenseSpentChartType,
  setExpenseSpentChartType,
  expenseSpentChartData,
}) => {
  const toggleHandler = () => {
    const incrementedType = expenseSpentChartType + 1;
    if (expenseSpentChartType === 2) {
      setExpenseSpentChartType(0);
    } else {
      setExpenseSpentChartType(incrementedType);
    }
  };

  if (expenseSpentChartType === 0) {
    return (
      <>
        <Pie
          data={expenseSpentChartData}
          options={createChartOptions("Amount Spent", expenseSpentChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else if (expenseSpentChartType === 1) {
    return (
      <>
        <Doughnut
          data={expenseSpentChartData}
          options={createChartOptions("Amount Spent", expenseSpentChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else {
    return (
      <>
        <Bar
          data={expenseSpentChartData}
          options={createChartOptions("Amount Spent", expenseSpentChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  }
};

const IncomeChart = ({
  incomeChartType,
  setIncomeChartType,
  incomeChartData,
}) => {
  const toggleHandler = () => {
    const incrementedType = incomeChartType + 1;
    if (incomeChartType === 2) {
      setIncomeChartType(0);
    } else {
      setIncomeChartType(incrementedType);
    }
  };

  if (incomeChartType === 0) {
    return (
      <>
        <Pie
          data={incomeChartData}
          options={createChartOptions("Income", incomeChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else if (incomeChartType === 1) {
    return (
      <>
        <Doughnut
          data={incomeChartData}
          options={createChartOptions("Income", incomeChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  } else {
    return (
      <>
        <Bar
          data={incomeChartData}
          options={createChartOptions("Income", incomeChartType)}
        />
        <button
          onClick={toggleHandler}
          className="bg-green-500 w-16 h-7 border-2 text-white rounded-md"
        >
          Toggle
        </button>
      </>
    );
  }
};

const ChartPage = () => {
  const [isloading, setIsLoading] = useState(true);
  const [currentBudgetExists, setCurrentBudgetExists] = useState(null);
  const [expenseBudgetedChartData, setExpenseBudgetedChartData] =
    useState(null);
  const [expenseSpentChartData, setExpenseSpentChartData] = useState(null);
  const [incomeChartData, setIncomeChartData] = useState(null);
  const [expenseBudgetedChartType, setExpenseBudgetedChartType] = useState(0);
  const [expenseSpentChartType, setExpenseSpentChartType] = useState(0);
  const [incomeChartType, setIncomeChartType] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "grey",
      "violet",
      "indigo",
      "#50AF95",
      "F3BA2F",
      "2a71D0",
    ];
    budgetServices
      .getCurrentBudget()
      .then((result) => {
        console.log(result);
        console.log(result.data.length);
        if (result.data.length === 0) {
          setCurrentBudgetExists(false);
          setIsLoading(false);
        } else {
          const b = result.data[0];
          console.log(b.id);
          //get expenses and display
          setCurrentBudgetExists(true);
          budgetServices
            .getAllExpenses(b.id)
            .then((expenses) => {
              setExpenseBudgetedChartData({
                labels: expenses.data.map((e) => e.name),
                datasets: [
                  {
                    label: "Amount Budgeted",
                    backgroundColor: colors,
                    borderColor: "white",
                    borderWidth: 0,
                    radius: "50%",
                    data: expenses.data.map((e) => e.amountBudgeted),
                  },
                ],
              });
              setExpenseSpentChartData({
                labels: expenses.data.map((e) => e.name),
                datasets: [
                  {
                    label: "Amount Spent",
                    backgroundColor: colors,
                    borderColor: "white",
                    borderWidth: 0,
                    radius: "50%",
                    data: expenses.data.map((e) => e.amountSpent),
                  },
                ],
              });
              console.log("data", expenses.data);
              return budgetServices.getAllIncomes(b.id);
            })
            .then((incomes) => {
              console.log(incomes);
              setIncomeChartData({
                labels: incomes.data.map((i) => i.name),
                datasets: [
                  {
                    label: "Amount",
                    backgroundColor: colors,
                    borderColor: "white",
                    borderWidth: 0,
                    radius: "50%",
                    data: incomes.data.map((i) => i.amount),
                  },
                ],
              });
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      });
  }, [navigate]);

  if (isloading === true) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar active={1} />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Overview
          </div>
          <>
            <LoadingSpinner />
          </>
        </div>
      </div>
    );
  }
  if (currentBudgetExists === false) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar active={1} />
        <div className="flex-1 flex flex-col">
          <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
            Overview
          </div>
          <>
            <p>No current budget</p>
          </>
        </div>
      </div>
    );
  }
  // console.log(expenseChartData);
  return (
    <div className="flex flex-row w-screen h-screen ">
      <MenuBar active={1} />
      <div className="flex-1 flex flex-col">
        <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
          Overview
        </div>
        <>
          <div className="mx-auto">
            <ExpenseBudgetedChart
              expenseBudgetedChartType={expenseBudgetedChartType}
              setExpenseBudgetedChartType={setExpenseBudgetedChartType}
              expenseBudgetedChartData={expenseBudgetedChartData}
            />
          </div>
          <div className="mx-auto">
            <ExpenseSpentChart
              expenseSpentChartType={expenseSpentChartType}
              setExpenseSpentChartType={setExpenseSpentChartType}
              expenseSpentChartData={expenseSpentChartData}
            />
          </div>
          <div className="mx-auto">
            <IncomeChart
              incomeChartType={incomeChartType}
              setIncomeChartType={setIncomeChartType}
              incomeChartData={incomeChartData}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export { ChartPage };

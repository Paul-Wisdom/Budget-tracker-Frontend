import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = "/api/";

const createBudget = () => {
  const url = baseUrl + "create-budget";
  return axios.post(url);
};

const getCurrentBudget = () => {
  const url = baseUrl + "get-budget/current";
  return axios.get(url);
};

const getExpense = (budget_id, expense_id) => {
  const url = baseUrl + `get-expense/${expense_id}?budget_id=${budget_id}`;
  return axios.get(url);
};

const getAllExpenses = (budget_id) => {
  const url = baseUrl + `get-expense/all?budget_id=${budget_id}`;
  return axios.get(url);
};

const createExpense = (expense) => {
  const url = baseUrl + "create-expense";
  return axios.post(url, expense);
};

const createExpenseTransaction = (expense) => {
  const url = baseUrl + `create-expense-transaction`;
  return axios.post(url, expense);
};

const editExpense = (name, amountBudgeted, expense_id, budget_id) => {
  const url = baseUrl + `edit-expense/${expense_id}`;
  return axios.put(url, {
    name: name,
    amountBudgeted: amountBudgeted,
    budget_id: budget_id,
  });
};

const deleteExpense = (expense_id, budget_id) => {
  const url = baseUrl + `delete-expense/${expense_id}?budget_id=${budget_id}`;
  return axios.delete(url);
};

const getAllIncomes = (budget_id) => {
  const url = baseUrl + `get-income/all?budget_id=${budget_id}`;
  return axios.get(url);
};

const createIncomeTransaction = (income) => {
  const url = baseUrl + "create-income-transaction";
  return axios.post(url, income);
};

const getTransactions = () => {
  const url = baseUrl + "get-transactions";
  return axios.get(url);
};

const getTotal = (budget_id) => {
  const url = baseUrl + `get-totals?budgetId=${budget_id}`;
  return axios.get(url);
};
export default {
  getCurrentBudget,
  getAllExpenses,
  getAllIncomes,
  createBudget,
  createExpense,
  createIncomeTransaction,
  getExpense,
  editExpense,
  deleteExpense,
  createExpenseTransaction,
  getTransactions,
  getTotal,
};

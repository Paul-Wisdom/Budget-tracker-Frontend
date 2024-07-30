// import './App.css';
import { useState, useEffect } from "react";

import authServices from "./services/Auth";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./components/helpers";
import { CreateExpense, GetExpense } from "./components/Expense";
import { TransactionsPage } from "./components/Transactions";
import { SignIn } from "./components/SignIn";
import { SignOut } from "./components/SignOut";
import { SignUp } from "./components/SignUp";
import { Budget } from "./components/Budget";
import { CreateIncome } from "./components/Income";
import { ForgetPassword } from "./components/ForgetPassword";
import { Welcome } from "./components/Welcome";
import { NavBar } from "./components/NavBar";
import { ChartPage } from "./components/Chart";

// const Welcome = () => {
//   return(
//     <>
//       <NavBar />
//       <p className='text-4xl font-bold text-blue-500'>Welcome to the monthly budget Tracker.</p>
//       <p>I'll finish up later</p>
//     </>
//   )
// }

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  // const [incomeChartData, setIncomeChartData] = useState(null);

  // const navigate = useNavigate();
  useEffect(() => {
    authServices
      .isLoggedIn()
      .then((result) => {
        console.log(result);
        setIsAuth(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isloading) {
    return (
      <div className="flex flex-col">
        {/* <NavBar/> */}
        <>Loading ...</>
      </div>
    );
  }
  return (
    // <SignUp />
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setIsAuth={setIsAuth} />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/signout"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <SignOut setIsAuth={setIsAuth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Budget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-expense"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CreateExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-expense"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <GetExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-income"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CreateIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <ChartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

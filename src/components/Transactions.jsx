import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import MenuBar from "./MenuBar";

import budgetServices from "../services/Budget";

const Transaction = ({ transaction }) => {
  let borderStyle;
  let amountStyle;
  transaction.createdAt = transaction.createdAt.split("T")[0];
  // console.log(transaction.createdAt);
  if (transaction.type === "Expense") {
    borderStyle = "flex flex-col border-x-4 border-red-500 my-2 p-3 bg-red-300";
    // transaction.amount = `- N ${transaction.amount}`;
    amountStyle = "text-red-500";
  } else {
    borderStyle =
      "flex flex-col border-x-4 border-green-500 my-4 p-3 bg-green-300";
    // transaction.amount = "+ N" + transaction.amount;
    amountStyle = "text-green-500";
  }
  return (
    <div className={borderStyle}>
      <div className="flex flex-row">
        <p className="flex-1">{transaction.name}</p>
        <p>{transaction.createdAt}</p>
      </div>
      <div className="flex flex-row">
        <p className="flex-1">{transaction.note}</p>
        {transaction.type === "Expense" ? (
          <p className={amountStyle}>- N{transaction.amount}</p>
        ) : (
          <p className={amountStyle}> + N{transaction.amount}</p>
        )}
      </div>
    </div>
  );
};

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    budgetServices
      .getTransactions()
      .then((transactions) => {
        console.log(transactions.data);
        setTransactions(transactions.data.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      });
  }, [navigate]);

  if (isloading) {
    return (
      <div className="flex flex-row w-screen h-screen ">
        <MenuBar active={2} />
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
  return (
    <div className="flex flex-row w-screen h-screen ">
      <MenuBar active={2} />
      <div className="flex-1 flex flex-col">
        <div className="w-full  bg-green-500 min-h-9  mt-0 text-xl text-white md:text-center">
          Transactions
        </div>
        <div className="w-10/12 md:w-3/5 md:mx-auto mt-8">
          {transactions.length > 0 ? (
            transactions.map((t) => {
              return <Transaction transaction={t} key={t.id} />;
            })
          ) : (
            <p>No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { Transaction, TransactionsPage };

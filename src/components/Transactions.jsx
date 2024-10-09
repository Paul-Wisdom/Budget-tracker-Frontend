import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import MenuBar from "./MenuBar";

import budgetServices from "../services/Budget";


//bg-gray-500
const Transaction = ({ transaction }) => {
  let borderStyle;
  let amountStyle;
  transaction.createdAt = transaction.createdAt.split("T")[0];
  // console.log(transaction.createdAt);
  if (transaction.type === "Expense") {
    borderStyle = "flex flex-col border-l-4 border-x-red-500 border-y-1 shadow-md my-2 p-3 bg-gray-100";
    // transaction.amount = `- N ${transaction.amount}`;
    amountStyle = "text-red-500";
  } else {
    borderStyle =
      "flex flex-col border-l-4 border-green-500 my-4 p-3 bg-gray-100 shadow-md border-y-1";
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
  const [pageTransactions, setPageTransactions] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const navigate = useNavigate();
  const itemPerPage = 5;
  useEffect(() => {
    budgetServices
      .getTransactions()
      .then((t) => {
        console.log(t.data);
        setTransactions(t.data.reverse());
        setIsLoading(false);
        // console.log("math ",t.data.length, itemPerPage, Number(t.data.length) / Number(itemPerPage))
        setNumberOfPages(Math.ceil(Number(t.data.length) / Number(itemPerPage)))
        setCurrentPage(1)
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      });
  }, [navigate]);

  useEffect(() => {
    if(transactions.length > 0){
      setPageTransactions (transactions.slice(currentPage === 1? 0: ((currentPage-1)*itemPerPage), (currentPage*itemPerPage)))
    }
    currentPage === 1 ? setHasPrevPage(false) : setHasPrevPage(true);
    console.log(numberOfPages)
    currentPage < numberOfPages ? setHasNextPage(true) : setHasNextPage(false)
  }, [currentPage, transactions, numberOfPages])

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
        <div className="w-10/12 md:w-3/5 md:mx-auto mt-8 flex flex-col">
        <div className="flex-1">
          {transactions.length > 0 ? (
            pageTransactions.map((t) => {
              return <Transaction transaction={t} key={t.id} />;
            })
          ) : (
            <p>No transactions yet</p>
          )}
        </div>
        {transactions.length > 0 ?
          <div className = "flex flex-row text-green-500 w-3/5 justify-center text-center ml-4 text-2xl">
            {hasPrevPage && currentPage - 1 !== 1 ? <button className="hover mx-2" onClick={() => setCurrentPage(1)}>1...</button> : <p></p>}
            {hasPrevPage === true ? <button className="hover mx-2" onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button> : <p></p>}
            <p className = 'text-black px-2'>{currentPage}</p>
            {hasNextPage === true ? <button className="hover mx-2" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button> : <p></p>}
            {hasNextPage && currentPage + 1 !== numberOfPages ? <button className="hover mx-2" onClick={() => setCurrentPage(numberOfPages)}>...{numberOfPages}</button> : <p></p>}
          </div>
          :<p></p>
        } 
        </div>
      </div>
    </div>
  );
};

export { Transaction, TransactionsPage };

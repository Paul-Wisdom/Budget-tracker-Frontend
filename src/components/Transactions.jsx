import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { SideBar } from "./SideBar";

import budgetServices from '../services/Budget'

const Transaction = ({transaction}) => {

    transaction.createdAt = transaction.createdAt.split('T')[0];
    // console.log(transaction.createdAt);
    return (
      <div>
        <p>{transaction.name} {transaction.amount} {transaction.note} {transaction.type} {transaction.createdAt}</p>
      </div>
    )
  }
  
  const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      budgetServices.getTransactions().then(transactions => {
        console.log(transactions.data);
        setTransactions(transactions.data);
        setIsLoading(false);
      }).catch(err => {
        console.log(err);
        if(err.response.status === 401)
          {
            navigate('/signin');
          }
      })
    }, [navigate]);
  
    if(isloading)
      {
        return(<>
          <SideBar />
          <p>Loading ....</p>
        </>);
      }
    return(
      <>
        <SideBar />
        <h2>Transactions</h2>
        {transactions.length > 0 ? transactions.map(t => {
          return <Transaction transaction={t} key={t.id}/>
        }) : <p>No transactions yet</p>}
      </>
    )
}

export {
    Transaction,
    TransactionsPage
}
  
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { SideBar } from "./SideBar";

import budgetServices from '../services/Budget'

const Income = ({income}) => {

    return(
      <div>
        <p>{income.name} {income.amount}</p>
      </div>
    )
}  
const CreateIncome = ({isAuth}) => {
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
            <SideBar />
            <p>Income "{name}" created successfully</p>
            <Link to="/home">Back</Link>
            <button onClick={createIncomeHandler}>Create Income</button>
          </>
        )
      }
    return(
      <>
        <SideBar />
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

export {
    CreateIncome,
    Income
}
  
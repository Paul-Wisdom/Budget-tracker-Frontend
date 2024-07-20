import { Link } from "react-router-dom"
const SideBar = () => {
    return(
      <>
        <Link to='/home'>Budget</Link>
        <Link to='/overview'>Overview</Link>
        <Link to='/transactions'>Transactions</Link>
        <Link to='/signout'>Sign Out</Link>
      </>
    )
}

export {SideBar}
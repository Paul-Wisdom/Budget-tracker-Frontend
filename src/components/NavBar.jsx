import { Link } from "react-router-dom"
const NavBar = () => {
    return(
      <>
        <Link to='/signin'>Sign In</Link>
        <Link to='/signup'>Sign Up</Link>
      </>
    )
}

export {NavBar}
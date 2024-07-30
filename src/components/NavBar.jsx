import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="py-4 bg-green-400 max-w-screen min-h-6/12 md:min-h-1/5 flex flex-row items-center mb-5">
      <Link
        className="text-white pl-3 pr-5 md:pr-9 text-xl active:text-green-600"
        to="/signin"
      >
        Sign In
      </Link>
      <Link className="text-white  text-xl active:text-green-600" to="/signup">
        Sign Up
      </Link>
    </div>
  );
};

export { NavBar };

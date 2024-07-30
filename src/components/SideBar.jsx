import { Link } from "react-router-dom";
const SideBar = ({ menuClicked, active }) => {
  let style =
    "text-white md:flex md:flex-col w-15vw min-h-screen bg-gradient-to-r from-green-300 to-green-500 hidden";
  let linkStyles = [
    "mt-14 mb-2 ml-3 hover:text-green-600  active:text-green-600",
    "mb-2 ml-3 hover:text-green-600 active:text-green-600",
    "mb-6 ml-3 hover:text-green-600  active:text-green-600",
    "ml-3 hover:text-green-600 active:text-green-600 border-t-2 w-20",
  ];
  if (active != null) {
    linkStyles[active] = linkStyles[active] + " text-green-600";
  }
  if (menuClicked) {
    style =
      "text-white flex flex-col w-40vw md:w-15vw min-h-screen bg-gradient-to-r from-green-300 to-green-500";
  }
  return (
    <div className={style}>
      <Link className={linkStyles[0]} to="/home">
        Budget
      </Link>
      <Link className={linkStyles[1]} to="/overview">
        Overview
      </Link>
      <Link className={linkStyles[2]} to="/transactions">
        Transactions
      </Link>
      <Link className={linkStyles[3]} to="/signout">
        Sign Out
      </Link>
    </div>
  );
};

export { SideBar };

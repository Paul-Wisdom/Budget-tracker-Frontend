import { useState } from "react";
import { SideBar } from "./SideBar";
const MenuBar = ({ active }) => {
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <div className="flex flex-col h-9 bg-green-500 md:h-1/5 ">
      <div className="md:hidden mx-3 mt-2 bg-green-500">
        <div
          className="bg-black min-w-6 max-w-6 min-h-1 mb-1"
          onClick={() => {
            setMenuClicked(!menuClicked);
          }}
        ></div>
        <div className="bg-black min-w-6 min-h-1 max-w-6 mb-1"></div>
        <div className="bg-black min-w-6 min-h-1 max-w-6 mb-1"></div>
      </div>
      <SideBar menuClicked={menuClicked} active={active} />
    </div>
  );
};

export default MenuBar;

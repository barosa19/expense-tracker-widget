import React from "react";
import categories from "../data/categories";
import {GlobalContext} from "../contexts/GlobalContext"

const Legend = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { darkMode } = React.useContext(GlobalContext);
    const toggleCollapse = () => setIsOpen(!isOpen);
  
    return (
      <div className="d-inline mx-2" data-bs-theme={darkMode ? "dark" : "light"}>
        <button className={`btn my-2 fw-bold ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`} 
          onClick={toggleCollapse}>
            <text>Legend </text>
            <i className="bi bi-caret-down-square-fill"></i>
        </button>
        <div className={`collapse ${isOpen ? 'show d-flex justify-content-center flex-wrap mx-4' : ''} `}>
          {categories.map((category)=>{
            return (
                <text className={`bg-${category.split(" ")[0]}-custom bg-spacing mx-2 my-2`}>{category}</text>
            )
          })}
        </div>
      </div>
    );
  };
  
  export default Legend;

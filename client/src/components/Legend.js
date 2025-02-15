import React from "react";
import categories from "../data/categories";

const Legend = () => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    const toggleCollapse = () => setIsOpen(!isOpen);
  
    return (
      <div className="d-inline mx-2">
        <button className="btn btn-light my-2 fw-bold" onClick={toggleCollapse}>
            <text>Legend </text>
            <i className="bi bi-caret-down-square-fill"></i>
        </button>
        <div className={`collapse ${isOpen ? 'show d-flex justify-content-center flex-wrap mx-4' : ''} `}>
          {categories.map((category)=>{
            return (
                <text className={`bg-${category.split(" ")[0]}-custom text-white bg-spacing mx-2 my-2`}>{category}</text>
            )
          })}
        </div>
      </div>
    );
  };
  
  export default Legend;

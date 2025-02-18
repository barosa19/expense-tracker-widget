import { GlobalContext } from "../contexts/GlobalContext";
import React from "react";

function Header() {
  const { darkMode, setDarkMode } = React.useContext(GlobalContext);


  return (
    <div data-bs-theme={darkMode ? "dark" : "light"} className="d-flex justify-content-between align-items-center  p-4">
      <h1 className="fw-bold text-body mx-auto ps-5">Expense Tracker Widget</h1>
      <div>
        <button
          className={`btn my-2 fw-bold ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`}
          onClick={() => {
            setDarkMode(!darkMode);
            document.body.classList=""
            console.log(darkMode)
            document.body.classList.add(darkMode ? "bg-light" : "bg-dark")
          }}
        >
          <i className={darkMode ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"}></i>
          <text> {darkMode ? "Dark" : "Light"} </text>
        </button>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import AddExpenseForm from "./AddExpenseForm";
import { GlobalContext } from "../contexts/GlobalContext";

const AddExpenseBtn = () => {
  const { darkMode, showModal, setShowModal } = React.useContext(GlobalContext);
  const openExpenseForm = () => setShowModal(true);
  const closeExpenseForm = () => setShowModal(false);
  return (
    <div className="d-inline mx-2" data-bs-theme={darkMode ? "dark" : "light"}>
      <button
        className={`btn my-2 fw-bold ${
          darkMode ? "bg-light text-dark" : "bg-dark text-light"
        }`}
        onClick={() => {
          openExpenseForm();
        }}
      >
        <i className="bi bi-plus-square-fill"></i>
        <text> Add Expense </text>
      </button>
      <AddExpenseForm
        openExpenseForm={showModal}
        closeExpenseForm={closeExpenseForm}
      />
    </div>
  );
};

export default AddExpenseBtn;

import React from "react";
import AddExpenseForm from "./AddExpenseForm";

const AddExpenseBtn = () => {
    const [showModal, setShowModal] = React.useState(false);
    const openExpenseForm = () => setShowModal(true);
    const closeExpenseForm = () => setShowModal(false);
    return (
      <div className="d-inline mx-2">
        <button className="btn btn-light my-2 fw-bold"
                onClick={() => {
                    openExpenseForm()}}>
            <i className="bi bi-plus-square-fill"></i>
            <text>  Add Expense </text>
        </button>
        <AddExpenseForm openExpenseForm={showModal} closeExpenseForm={closeExpenseForm} />
      </div>
    );
  };
  
  export default AddExpenseBtn;

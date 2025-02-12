import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useCreateExpense from "../hooks/useCreateExpense";
import categories from '../data/categories.js'

const AddExpenseForm = ({ openExpenseForm, closeExpenseForm }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    amount: "",
    category: "Choose...",
    date: "",
  });

  const addExpense = useCreateExpense()

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "amount" ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: "", amount:"", category: "", date: "" })
        closeExpenseForm();
      },
    });
  };
  const handleClose = () => {
    setFormData({ name: "", amount:"", category: "", date: "" })
    closeExpenseForm();
  };
  return (
    <Modal show={openExpenseForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter expense name" name="name" value={formData.name}  onChange={handleChange} required/>
      </Form.Group>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="amount" name="amount" type="number" value={formData.amount}  onChange={handleChange} min="0" step="0.01" required/>
      </InputGroup>
      <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange} required>
            <option>Choose...</option>
            {categories.map(category => <option key={category}>{category}</option>)}
          </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
    </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseForm;

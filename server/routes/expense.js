const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

let expenses = []
router
    .route("/")
    .get((req, res)=> {
        res.json(expenses)
    })
    .post((req, res)=> {
        const newExpense = {
            id: uuidv4(),
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
        }
        console.log(newExpense)
        expenses.push(newExpense)
        res.status(201).json(newExpense)
    })

router
    .route("/:id")
    .get((req, res)=> {
        res.json(req.expense)
    })
    .delete((req, res)=> {
        expenses = expenses.filter(expense => expense.id !== req.params.id);
        res.json(expenses)
    })

    router.param("id", (req, res, next, id) => {
        const expense = expenses.find(expense => expense.id === id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }
        req.expense = expense
        next()
    })

module.exports = router
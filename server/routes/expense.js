const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const categories =require('../data/categories')
const expenses = require('../data/expenses')

// router
//   .route("/category/:category")
//   .get((req, res)=> {
//       let sum = 0
//       expenses = expenses.filter(expense => expense.category == req.params.category);
//       console.log(expenses)
//       expenses.forEach(expense => sum += expense.amount)
//       res.json(sum)
//   })
router
  .route("/category/")
  .get((req, res)=> {
      let pieChartData = []
      categories.forEach(
        (category) => {
          let sum = 0
          const filteredExpenses = expenses.filter(expense => expense.category == category);
          filteredExpenses.forEach(expense => sum += expense.amount)
          pieChartData.push({category:category, sum: sum})
        })
      console.log(pieChartData)
      res.json(pieChartData)
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
      
      const expense = expenses.find(expense => expense.id == id);
  if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
  }
      req.expense = expense
      next()
  })
router
    .route("/")
    .get((req, res)=> {
        console.log(res.json(expenses))
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


module.exports = router
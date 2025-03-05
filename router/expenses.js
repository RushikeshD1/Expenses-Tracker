const express = require("express")
const Expenses = require("../controller/expenses")

const router = express.Router()

router.post("/create", Expenses.createExpense)
router.get("/get", Expenses.getExpense)
router.put("/update/:id", Expenses.updateExpense)
router.delete("/delete/:id", Expenses.deleteExpense)

module.exports = router
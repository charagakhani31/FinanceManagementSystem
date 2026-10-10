import expenseModel from "../models/expense.model.js";

async function createExpense(req, res) {
    const {title, category, amount, description, date} = req.body

    const expense = await expenseModel.create({
        title, 
        category, 
        amount, 
        description, 
        date,
        business: req.user.business
    })

    await expense.populate("business", "businessName")

    res.status(201).json({
        message: "expense created successfully",
        expense: {
        title: expense.title,
        category: expense.category, 
        amount: expense.amount,
        description: expense.description, 
        date: expense.date,
        business: expense.business.businessName
        }
    })
}

async function viewExpenses(req, res) {

    const expenses = await expenseModel.find({business: req.user.business})

    if(!expenses) {
        return res.status(404).json({
            message: "expenses not found"
        })
    }

    res.status(200).json({
        message: "expenses fetched successfully",
        expenses
    })
}

async function getExpense(req, res) {

    const expense = await expenseModel.findOne({
        _id: req.params.id,
        business: req.user.business
    })
     if(!expense) {
        return res.status(404).json({
            message: "expenses not found"
        })
    }

    res.status(200).json({
        message: "expense fetched successfully",
        expense
    })
}

async function updateExpense(req, res) {
    const {amount, description} = req.body;

    const expense = await expenseModel.findOneAndUpdate({
         _id: req.params.id,
        business: req.user.business
    }, {
        amount,
        description
    }, {new: true})

    if(!expense) {
        return res.status(404).json({
            message: "expenses not found"
        })
    }

    res.status(200).json({
        message: "expense updated successfully",
        expense
   })
}

async function deleteExpense(req, res) {

    const expense = await expenseModel.findOneAndDelete({
         _id: req.params.id,
        business: req.user.business
    })

     if(!expense) {
        return res.status(404).json({
            message: "expenses not found"
        })
    }

    res.status(200).json({
        message: "expense deleted successfully",
    })
}

export default {createExpense, viewExpenses, getExpense, updateExpense, deleteExpense}
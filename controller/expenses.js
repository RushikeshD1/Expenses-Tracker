const Expense = require("../model/expensesModel");

const createExpense = async (req, res) => {

    const { amount, category, description, date } = req.body;

    if (!amount || !category || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        });
    }

    const newExpense = await Expense.create({
        amount,
        category,
        description,       
        date: date || Date.now() 
    });
        
    res.status(200).json({
        success : true,
        message : "Expense created successfully"
    })
}

const getExpense = async (req, res) => {

    try {
        const expenses = await Expense.find();
        
        res.status(200).json({
            success : true,
            message : "Expense getted successfully",
            expenses : expenses
        })
    } catch (error) {
        res.status(400).json({
            success : true,
            message : "Expense fetching error"
        })
    }    
}

const updateExpense = async (req, res) => {

    const { id } = req.params;

    if(!id){
        return res.status(400).json({
            success : false,
            message : "ProductId not found"
        })
    }
    
    await Expense.findByIdAndUpdate(id, { $set : {isActive : req.body}})

    res.status(200).json({
        success : true,
        message : "Expense updated successfully"
    })
}

const deleteExpense = async(req, res) => {

    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "ProductId not found"
            })
        }

        const expenses = await Expense.findById(id)

        if(!expenses){
            return res.status(400).json({
                success : false,
                message : "id not found"
            })
        }

        await Expense.findByIdAndDelete(id, {$set : {isActive : false}})

        res.status(200).json({
            success : true,
            message : "Expense deleted successfully"
        })
    }catch(err){
        res.status(400).json({
            success : false,
            message : "Expense deleteing error"
        })
    }
}

const Expenses = {
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
}

module.exports = Expenses
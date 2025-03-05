
const Categories = require("../model/categoryModel")

const createCategory = async (req, res) => {
    const {
        name
    } = req.body

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        });
    }

    const newCategory = await Categories.create({
        name
    });

    res.status(200).json({
        success : true,
        message : "category created successfully"
    })
}

const getCategory = async (req, res) => {

    const Category = await Categories.find()

    if(Category.length === 0){
        return res.status(400).json({
            sucess : false,
            message : "Please create category"
        })
    }
    res.status(200).json({
        success : true,
        message : "category getted successfully",
        Category: Category
    })
}

// const updateCategory = (req, res) => {
//     res.status(200).json({
//         success : true,
//         message : "category updated successfully"
//     })
// }

// const deleteCategory = (req, res) => {


//     res.status(200).json({
//         success : true,
//         message : "category deleted successfully"
//     })
// }

const Category = {
    createCategory,
    getCategory,
    // updateCategory,
    // deleteCategory
}

module.exports = Category
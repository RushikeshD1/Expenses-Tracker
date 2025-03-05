const express = require("express")
const Category = require("../controller/category")

const router = express.Router()

router.post("/create", Category.createCategory)
router.get("/get", Category.getCategory)
// router.put("/update/:id", Category.updateCategory)
// router.delete("/delete/:id", Category.deleteCategory)

module.exports = router
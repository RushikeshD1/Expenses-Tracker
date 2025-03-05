const express = require("express")
const cors = require("cors")
const userRoutes = require("./router/user")
const categoryRoutes = require("./router/categories")
const expenseRoutes = require("./router/expenses")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authMiddleware = require("./middleware/authMiddleware")

dotenv.config()

const app = express()

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cors({
  origin : [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}))

app.use('/v1/api/user', userRoutes)
app.use('/v1/api/expense', expenseRoutes)
// app.use('/v1/api/categorie', authMiddleware, categoryRoutes)

mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("Error connecting DB", err));

app.listen(process.env.PORT, () => {
    console.log("Server starting at port 10000")
})

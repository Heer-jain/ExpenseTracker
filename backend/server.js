const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const AuthRouter = require("./Routes/AuthRouter")
const IncomeRouter = require("./Routes/IncomeRouter")
const ExpenseRouter = require("./Routes/ExpenseRouter")
const BudgetRouter = require("./Routes/BudgetRouter")
require('dotenv').config();
require("./Models/db")


const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/income', IncomeRouter)
app.use('/expense', ExpenseRouter)
app.use('/budget', BudgetRouter)

app.get("/ping", (req, res)=>{
  res.send("PONG")
})

app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`)
})
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')


// require all the routes here
const authRouter = require("./Routes/auth.routes")
const interviewRouter = require("./Routes/interview.routes")


const app = express()
//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// using all the routes
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app
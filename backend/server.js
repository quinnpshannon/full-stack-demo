const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
require("./utils/connect.js")
const userRoute = require("./routes/user.js")


const PORT = process.env.PORT || 4000


const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use('/api/users', userRoute)

app.get("/", (req, res)=>{
    res.send("In it to Win it!")
})

app.listen(PORT, ()=>{
    console.log("Listening at http://localhost:"+PORT)
})
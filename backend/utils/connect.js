const mongoose = require("mongoose");

async function connectDB() {
    try {
       await mongoose.connect(process.env.DATABASE_URI)
       console.log('MongoDB Connected!')
    } catch(err) {
        console.log(err)
    }
}

connectDB()
    
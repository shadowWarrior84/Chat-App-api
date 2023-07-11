const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/reactjs-socketIo")

        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB
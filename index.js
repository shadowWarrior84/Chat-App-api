const express = require("express")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoute")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")

require("dotenv").config()
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

connectDB()
const app = express();

app.use(express.json())
 

app.use("/api/users", userRoute)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(8000, ()=>{
    console.log("Server started on PORT 8000")
})
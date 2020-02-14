const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const userRouter = require("./src/routers/userRouter")
const postRouter = require("./src/routers/postRouter")
const dotenv = require("dotenv")
dotenv.config()
const auth = require("./src/utils/auth")

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.log(err ? err : "Mongo Connected"))

const server = express();

server.use(cors())
server.use(express.json())
server.use(passport.initialize())

server.use("/user", userRouter)
server.use("/posts", postRouter)


server.listen(process.env.PORT || 3500, ()=> console.log("Web Server is running"))
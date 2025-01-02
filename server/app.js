import express from "express"
import config from "config"
import publicRouter from "./controllers/public/index.js"
import userRouter from "./controllers/user/index.js"
import gistRouter from "./controllers/gists/index.js"
import repoRouter from "./controllers/repos/index.js"
import authMiddleware from "./middleware/auth.js"
import rateLimit from "express-rate-limit"

import "./utils/dbConnect.js"

const app = express()
const PORT = config.get("PORT")

app.use(express.json())

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"hello world"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

const limitMaker = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: "draft-8", 
    legacyHeaders: false, 
});

app.use("/api/public/users", publicRouter)
app.use(authMiddleware)
app.use("api/private/users",userRouter)
app.use("/api/private/gists",gistRouter)
app.use("/api/private/repos",repoRouter)
app.listen(PORT,()=>{
    console.log(`the server is up and running ${PORT}`);
})
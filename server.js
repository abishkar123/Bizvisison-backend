import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan"
import cors from "cors"
import path from 'path'
const app = express();



const PORT = process.env.PORT || 8000;

//db Connect 
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect()

const __dirname = path.resolve()
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "/client/build")))

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));


//API Router 
import JoinRouter from './src/router/JoinRouter.js'
import AdminRouter from './src/router/AdminRouter.js'
import blogRouter from './src/router/blogRouter.js'



app.use("/api/v1/join", JoinRouter)
app.use("/api/v1/admin", AdminRouter)
app.use("/api/v1/blog", blogRouter)


 


//root url request
app.use("/", (req, res, next) => {
    const error = {
      message: "You dont have promission here",
    };
    next(error);
  });
  
//global error handleer
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.errorCode || 404;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  });

  app.listen(PORT, (error) => {
    error
      ? console.log(error)
      : console.log(`Server running at http://localhost:${PORT}`);
  });
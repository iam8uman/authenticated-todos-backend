import express from "express";
import dotenv from "dotenv";
import userRouter  from "./routes/user.js";
import taskRouter  from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
dotenv.config();

export const app = express();

// using middleares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/user", userRouter );
app.use("/task", taskRouter );

// handle error 
app.use(errorMiddleware);



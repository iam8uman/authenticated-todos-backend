import express from "express";
import dotenv from "dotenv";
import userRouter  from "./routes/user.js";
import taskRouter  from "./routes/task.js";
dotenv.config();

export const app = express();

// using middleares
app.use(express.json());
app.use("/user", userRouter );

app.use("/task", taskRouter );



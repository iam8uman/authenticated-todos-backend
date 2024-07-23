import express from "express";
import dotenv from "dotenv";
import userRouter  from "./routes/user.js";
dotenv.config();

export const app = express();

// using middleares
app.use(express.json());
app.use("/user", userRouter );



import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/connectDB.js';

// Initialize dotenv
dotenv.config();

// connect to db
connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

import { connectDB } from './database/connectDB.js';
import { app } from './app.js';

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

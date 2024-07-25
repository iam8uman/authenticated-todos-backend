import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    if (res) {
      console.log(
        `Database is connected Successfully!! with ${res.connection.host}.`
      );
    }
    console.log("Database is connected Successfully!!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

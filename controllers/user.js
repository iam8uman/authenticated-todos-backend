import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import setCookie from "../utils/setCookie.js";
import CustomError from "../middlewares/error.js";

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });

      await newUser.save();

      setCookie(newUser, res, 201, "User created successfully");
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteSingleUser = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // If there's no token, return an error
    if (!token) {
      return next(new CustomError("Token Not Found", 400));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, proceed with deleting the user
    const user = await User.findByIdAndDelete(req.params.id);

    // If the user doesn't exist or has already been deleted, return an error
    if (!user) {
      return next(new CustomError("User Not Found", 400));
    }

    // If everything is okay, return the success message
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    // If the token is not valid, return an error
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // For other errors, return a 500 status code
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(params.id, req, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new CustomError("Invalid Email", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomError("Invalid Password", 400));
    }
    setCookie(user, res, 200, `${user.name} logged in successfully`);
  } catch (error) {
    next(error);
  }
};
const logOut = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });
  res.status(200).json({ message: "Logged out successfullyy" });
};

const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export {
  createUser,
  getAllUsers,
  deleteSingleUser,
  getUserById,
  updateUserById,
  loginUser,
  logOut,
  getMe,
};

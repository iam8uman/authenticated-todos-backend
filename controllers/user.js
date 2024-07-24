import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import setCookie from "../utils/setCookie.js";

const createUser = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSingleUser = async (req, res) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // If there's no token, return an error
    if (!token) {
      return res.status(403).json({ error: "Not authenticated" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, proceed with deleting the user
    const user = await User.findByIdAndDelete(req.params.id);

    // If the user doesn't exist or has already been deleted, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(params.id, req, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "Invalid Credencials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    setCookie(user, res, 200, `${user.name} logged in successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logOut = async (req, res) => {
  res.clearCookie("token");
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

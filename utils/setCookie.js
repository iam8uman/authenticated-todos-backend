import jwt from "jsonwebtoken";

const setCookie = (newUser, res, statusCode, msg) => {
  // Sign a token with the user's id as the payload
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Set the token in a HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    maxAge: 3600000,
  });

  // Send the response
  res.status(statusCode).json({
    success: true,
    message: msg,
    user: newUser,
  });
};

export default setCookie;

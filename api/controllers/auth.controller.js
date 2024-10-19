import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Catch and pass any errors to the error handler
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the password is correct
    const validPassword = bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token will expire in 1 day
    );

    // Exclude password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Set HTTP-only cookie with the token and return user details (without password)
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
        sameSite: "strict",
      })
      .json({ ...rest, token });
  } catch (error) {
    // Catch and pass any errors to the error handler
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

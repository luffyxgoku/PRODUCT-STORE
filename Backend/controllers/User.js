import User from "../models/User.js";
import bcrypt from "bcryptjs"; // For password hashing

// Create a new user account
export const createAccount = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword, // Store hashed password
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email }, // Don't return the password
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating account", error });
  }
};

// Login the user and create a session
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Set the session for the logged-in user
    req.session.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email }, // Don't return the password
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
};

// Logout the user and destroy the session
export const logoutUser = async (req, res) => {
  try {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error logging out", error: err });
      }

      res.status(200).json({ success: true, message: "Logout successful" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging out", error });
  }
};

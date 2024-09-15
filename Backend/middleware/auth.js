// middleware/auth.js

// Simple session-based authentication middleware
const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // User is logged in, proceed to the next middleware or route handler
  } else {
    res
      .status(403)
      .json({ success: false, message: "Forbidden: Not authenticated" });
  }
};

export default auth;

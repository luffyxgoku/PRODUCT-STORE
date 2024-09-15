import express from "express";

import { createAccount, loginUser, logoutUser } from "../controllers/User.js";

const router = express.Router();

router.post("/register", createAccount);
router.post("/signin", loginUser);
router.get("/signout", logoutUser);

export default router;

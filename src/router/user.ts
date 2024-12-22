import express from "express";
import { viewGroceries, bookGroceries,loginUser,registerUser } from "../controllers/user";
import authenticate from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/groceries", authenticate(["user", "admin"]), viewGroceries);
router.post("/book", authenticate(["user"]), bookGroceries);

export default router;

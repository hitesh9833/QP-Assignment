import express from "express";
import { addGrocery, viewGroceries, updateGrocery, deleteGrocery, manageInventory } from "../controllers/admin";
import authenticate from "../middleware/auth";

const router = express.Router();

router.post("/grocery", authenticate(["admin"]), addGrocery);
router.get("/groceries", authenticate(["admin"]), viewGroceries);
router.put("/grocery/:id", authenticate(["admin"]), updateGrocery);
router.delete("/grocery/:id", authenticate(["admin"]), deleteGrocery);
router.patch("/inventory/:id", authenticate(["admin"]), manageInventory);

export default router;

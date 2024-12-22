"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/grocery", (0, auth_1.default)(["admin"]), admin_1.addGrocery);
router.get("/groceries", (0, auth_1.default)(["admin"]), admin_1.viewGroceries);
router.put("/grocery/:id", (0, auth_1.default)(["admin"]), admin_1.updateGrocery);
router.delete("/grocery/:id", (0, auth_1.default)(["admin"]), admin_1.deleteGrocery);
router.patch("/inventory/:id", (0, auth_1.default)(["admin"]), admin_1.manageInventory);
exports.default = router;

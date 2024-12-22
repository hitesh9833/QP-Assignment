"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/register", user_1.registerUser);
router.post("/login", user_1.loginUser);
router.get("/groceries", (0, auth_1.default)(["user", "admin"]), user_1.viewGroceries);
router.post("/book", (0, auth_1.default)(["user"]), user_1.bookGroceries);
exports.default = router;

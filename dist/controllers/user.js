"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = exports.bookGroceries = exports.viewGroceries = void 0;
const grocery_1 = __importDefault(require("../model/grocery"));
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const viewGroceries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield grocery_1.default.findAll();
        res.status(200).json(groceries);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error fetching grocery items", error: error.message });
        }
    }
});
exports.viewGroceries = viewGroceries;
const bookGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            res.status(400).json({ message: "Items array is required and cannot be empty." });
            return;
        }
        const bookedItems = [];
        for (const item of items) {
            const grocery = yield grocery_1.default.findByPk(item.id);
            console.log("helljkojwg", item.quantity, grocery === null || grocery === void 0 ? void 0 : grocery.dataValues.quantity);
            if (!grocery || grocery.dataValues.quantity < item.quantity) {
                res.status(400).json({
                    message: `Insufficient stock or invalid item for grocery ID: ${item.id}`,
                });
                return;
            }
            grocery.dataValues.quantity -= item.quantity;
            yield grocery.save();
            bookedItems.push({ id: grocery.dataValues.id, name: grocery.dataValues.name, quantity: item.quantity });
        }
        res.status(200).json({ message: "Groceries booked successfully", bookedItems });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error booking groceries", error: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.bookGroceries = bookGroceries;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required." });
            return;
        }
        const user = yield user_1.default.findOne({ where: { username } });
        if (!user) {
            res.status(400).json({ message: "Invalid username or password." });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ message: "JWT_SECRET is not defined in environment variables." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, role: user.role }, jwtSecret);
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error logging in", error: error.message });
        }
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required." });
            return;
        }
        const existingUser = yield user_1.default.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        const newUser = yield user_1.default.create({ username, password: password, role: role || 'user' });
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error registering user", error: error.message });
        }
    }
});
exports.registerUser = registerUser;

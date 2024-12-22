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
exports.manageInventory = exports.deleteGrocery = exports.updateGrocery = exports.viewGroceries = exports.addGrocery = void 0;
const grocery_1 = __importDefault(require("../model/grocery"));
const addGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, quantity } = req.body;
        if (!name || price == null || quantity == null) {
            res.status(400).json({ message: "Name, price, and quantity are required." });
            return;
        }
        const grocery = yield grocery_1.default.create({ name, price, quantity });
        res.status(201).json({ message: "Grocery item added successfully", grocery });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error adding grocery item", error: error.message });
        }
    }
});
exports.addGrocery = addGrocery;
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
const updateGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const grocery = yield grocery_1.default.findByPk(id);
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        grocery.name = name || grocery.name;
        grocery.price = price !== null && price !== void 0 ? price : grocery.price;
        grocery.quantity = quantity !== null && quantity !== void 0 ? quantity : grocery.quantity;
        yield grocery.save();
        res.status(200).json({ message: "Grocery item updated successfully", grocery });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating grocery item", error: error.message });
        }
    }
});
exports.updateGrocery = updateGrocery;
const deleteGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const grocery = yield grocery_1.default.findByPk(id);
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        yield grocery.destroy();
        res.status(200).json({ message: "Grocery item deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error deleting grocery item", error: error.message });
        }
    }
});
exports.deleteGrocery = deleteGrocery;
const manageInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (quantity == null) {
            res.status(400).json({ message: "Quantity is required." });
            return;
        }
        const grocery = yield grocery_1.default.findByPk(id);
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        grocery.quantity = quantity;
        yield grocery.save();
        res.status(200).json({ message: "Inventory updated successfully", grocery });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating inventory", error: error.message });
        }
    }
});
exports.manageInventory = manageInventory;

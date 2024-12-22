import { Request, Response } from "express";
import Grocery from "../model/grocery";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const viewGroceries = async (_req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();

    res.status(200).json(groceries);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: "Error fetching grocery items", error: error.message });
    }
  }
};

export const bookGroceries = async (req: Request, res: Response): Promise<void> => {
    try {
      const { items } = req.body;
  
      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ message: "Items array is required and cannot be empty." });
        return;
      }
  
      const bookedItems: any[] = [];
      for (const item of items) {
        const grocery = await Grocery.findByPk(item.id);
        if (!grocery || grocery.dataValues.quantity < item.quantity) {
          res.status(400).json({
            message: `Insufficient stock or invalid item for grocery ID: ${item.id}`,
          });
          return;
        }
        grocery.dataValues.quantity -= item.quantity;
        await grocery.save();
  
        bookedItems.push({ id: grocery.dataValues.id, name: grocery.dataValues.name, quantity: item.quantity });
      }
      res.status(200).json({ message: "Groceries booked successfully", bookedItems });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error booking groceries", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };
  
  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
      }
      const user = await User.findOne({ where: { username } });
      if (!user) {
        res.status(400).json({ message: "Invalid username or password." });
        return;
      }
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        res.status(500).json({ message: "JWT_SECRET is not defined in environment variables." });
        return;
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        jwtSecret
      );
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
      }
    }
  };


  export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, role } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
      }
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      const newUser = await User.create({ username, password: password, role: role || 'user' });
      res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
      }
    }
  };
  
  

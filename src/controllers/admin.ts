import { Request, Response } from "express";
import Grocery from "../model/grocery";


export const addGrocery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, quantity } = req.body;

    if (!name || price == null || quantity == null) {
      res.status(400).json({ message: "Name, price, and quantity are required." });
      return;
    }

    const grocery = await Grocery.create({ name, price, quantity });
    res.status(201).json({ message: "Grocery item added successfully", grocery });
  } catch (error:unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error adding grocery item", error: error.message });
    }
  }
};

export const viewGroceries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json(groceries);
  } catch (error:unknown) {
    if (error instanceof Error) {
    res.status(500).json({ message: "Error fetching grocery items", error: error.message });
    }
  }
};

export const updateGrocery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const grocery = await Grocery.findByPk(id);

    if (!grocery) {
      res.status(404).json({ message: "Grocery item not found" });
      return;
    }

    grocery.name = name || grocery.name;
    grocery.price = price ?? grocery.price;
    grocery.quantity = quantity ?? grocery.quantity;

    await grocery.save();

    res.status(200).json({ message: "Grocery item updated successfully", grocery });
  } catch (error) {
    if (error instanceof Error) {
    res.status(500).json({ message: "Error updating grocery item", error: error.message });
    }
  }
};
export const deleteGrocery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const grocery = await Grocery.findByPk(id);

    if (!grocery) {
      res.status(404).json({ message: "Grocery item not found" });
      return;
    }

    await grocery.destroy();

    res.status(200).json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
    res.status(500).json({ message: "Error deleting grocery item", error: error.message });
    }
  }
};

export const manageInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      res.status(400).json({ message: "Quantity is required." });
      return;
    }

    const grocery = await Grocery.findByPk(id);

    if (!grocery) {
      res.status(404).json({ message: "Grocery item not found" });
      return;
    }

    grocery.quantity = quantity;
    await grocery.save();

    res.status(200).json({ message: "Inventory updated successfully", grocery });
  } catch (error) {
    if (error instanceof Error) {
    res.status(500).json({ message: "Error updating inventory", error: error.message });
    }
  }
};

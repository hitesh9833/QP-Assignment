import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Grocery extends Model {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: "grocery" }
);

export default Grocery;

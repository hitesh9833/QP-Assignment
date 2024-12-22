import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  role!: "admin" | "user";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

export default User;

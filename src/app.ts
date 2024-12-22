import express from "express";
import sequelize from "./config/database";
import adminRoutes from "./router/admin";
import userRoutes from "./router/user";
const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

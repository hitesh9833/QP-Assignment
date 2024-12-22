"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const admin_1 = __importDefault(require("./router/admin"));
const user_1 = __importDefault(require("./router/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
database_1.default
    .authenticate()
    .then(() => {
    console.log("Database connected successfully!");
    return database_1.default.sync();
})
    .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => {
    console.error("Database connection failed:", error);
});

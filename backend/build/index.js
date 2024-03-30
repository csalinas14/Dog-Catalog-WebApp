"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dog_api_1 = __importDefault(require("./routes/dog_api"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
require("express-async-errors");
const middleware_1 = __importDefault(require("./utils/middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import { connectToDatabase } from './utils/db';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/dogapi', dog_api_1.default);
app.use('/api/users', users_1.default);
app.use('/api/login', login_1.default);
app.use(middleware_1.default.errorHandler);
/**
const start = async () => {
  await connectToDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
/*
app.listen(process.env.PORT, () => {
  await connectToDatabase();
  console.log('Server running on port 3001');
});*/
//void start();
//for testing
exports.default = app;

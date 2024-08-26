"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DBURL = process.env.DB_URL || "";
const dbconnect = async () => {
    try {
        await mongoose_1.default.connect(DBURL);
        console.log("connected");
    }
    catch (e) {
        console.error(`error message ${e}`);
    }
};
exports.default = dbconnect;

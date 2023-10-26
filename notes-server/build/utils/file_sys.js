"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFolderExists = void 0;
const promises_1 = __importDefault(require("fs/promises"));
async function ensureFolderExists(folderPath) {
    try {
        // Check if the folder exists
        await promises_1.default.access(folderPath);
    }
    catch (error) {
        // If the folder doesn't exist, create it
        await promises_1.default.mkdir(folderPath, { recursive: true });
    }
}
exports.ensureFolderExists = ensureFolderExists;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = exports.appendDataToJSONFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dataPreparation_1 = require("../model/dataPreparation");
const baseDirectory = 'C:/atari-monk/docs/chatgpt_db';
const appendDataToJSONFile = async (req, res) => {
    const { filename } = req.params;
    const { question, answer, section } = req.body;
    const filePath = path_1.default.join(baseDirectory, filename);
    try {
        const notesData = await (0, dataPreparation_1.appendData)(filePath, section, question, answer);
        await promises_1.default.writeFile(filePath, JSON.stringify(notesData, null, 2));
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).send('Error reading or writing the file.');
    }
};
exports.appendDataToJSONFile = appendDataToJSONFile;
const getQuestion = async (req, res) => {
    const { filename } = req.params;
    const { section, question } = req.body;
    // Add your logic to read the question from the file based on section and question number
    const filePath = path_1.default.join(baseDirectory, filename);
    try {
        // Read and send the question data
        const notesData = await (0, dataPreparation_1.getQuestionFromJSON)(filePath, section, question);
        res.json(notesData);
    }
    catch (error) {
        res.status(500).send('Error reading the file or question not found.');
    }
};
exports.getQuestion = getQuestion;

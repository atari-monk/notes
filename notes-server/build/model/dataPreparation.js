"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionFromJSON = exports.appendData = void 0;
const fs_1 = require("fs");
async function appendData(filePath, section, question, answer) {
    try {
        const existingData = await readData(filePath);
        const newNote = {
            question,
            answer,
            dateTime: new Date().toISOString(),
        };
        const updatedData = updateData(existingData, section, newNote);
        await writeData(filePath, updatedData);
        return updatedData;
    }
    catch (err) {
        throw err;
    }
}
exports.appendData = appendData;
async function readData(filePath) {
    try {
        const data = await fs_1.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        return {
            sections: [],
        };
    }
}
function updateData(existingData, section, newNote) {
    const sectionIndex = existingData.sections.findIndex((s) => s.title === section);
    if (sectionIndex !== -1) {
        existingData.sections[sectionIndex].questions.push(newNote);
    }
    else {
        const newSection = {
            title: section,
            questions: [newNote],
        };
        existingData.sections.push(newSection);
    }
    return existingData;
}
async function writeData(filePath, data) {
    await fs_1.promises.writeFile(filePath, JSON.stringify(data, null, 2));
}
async function getQuestionFromJSON(filePath, sectionNumber, questionNumber) {
    try {
        const notesData = await readData(filePath);
        if (sectionNumber >= 0 &&
            sectionNumber < notesData.sections.length &&
            questionNumber >= 0 &&
            questionNumber < notesData.sections[sectionNumber].questions.length) {
            const section = notesData.sections[sectionNumber];
            const question = section.questions[questionNumber];
            return question;
        }
        return null; // Question or section not found
    }
    catch (err) {
        throw err;
    }
}
exports.getQuestionFromJSON = getQuestionFromJSON;

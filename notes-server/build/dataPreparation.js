"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareData = void 0;
const fs_1 = require("fs");
async function prepareData(filePath, section, question, answer) {
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
exports.prepareData = prepareData;
async function readData(filePath) {
    try {
        const data = await fs_1.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        // If the file doesn't exist, return default values
        return {
            sections: [
            // {
            //   title: 'Default Section',
            //   questions: [],
            // },
            ],
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

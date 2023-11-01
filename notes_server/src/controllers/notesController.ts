import { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import {
  appendData,
  editQuestion,
  loadQuestionFromJSON,
} from '../data/dataPreparation'
import { INoteEdit } from '../types/data/INoteEdit'

const baseDirectory = 'C:/atari-monk/docs/chatgpt_db'

export const appendDataToJSONFile = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { question, answer, section } = req.body
  const filePath = path.join(baseDirectory, filename)

  try {
    const notesData = await appendData(filePath, section, question, answer)
    await fs.writeFile(filePath, JSON.stringify(notesData, null, 2))
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Error reading or writing the file.')
  }
}

export const loadQuestion = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { sectionNr, questionNr } = req.body

  // Add your logic to read the question from the file based on section and question number
  const filePath = path.join(baseDirectory, filename)

  try {
    // Read and send the question data
    const notesData = await loadQuestionFromJSON(
      filePath,
      sectionNr,
      questionNr
    )
    res.json(notesData)
  } catch (error) {
    res.status(500).send('Error reading the file or question not found.')
  }
}

export const saveQuestion = async (req: Request, res: Response) => {
  const { filename } = req.params

  // Parse the request body as INoteEdit
  const noteEdit: INoteEdit = req.body as INoteEdit

  // Extract sectionNr and questionNr from the noteIndex
  const { sectionNr, questionNr } = noteEdit.noteIndex

  // Add your logic to read the question from the file based on section and question number
  const filePath = path.join(baseDirectory, filename)

  try {
    await editQuestion(
      filePath,
      sectionNr,
      questionNr,
      noteEdit.note.question,
      noteEdit.note.answer
    )
  } catch (error) {
    res.status(500).send('Error editing question.')
  }
}

import { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import {
  appendChatToFile,
  updateChatFromFile,
  loadchatFromFile,
} from '../data/dataPreparation'
import { IChatEdit } from '../types/data/IChatEdit'

const baseDirectory = 'C:/atari-monk/docs/chatgpt_db'

export const appendChat = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { question, answer, section } = req.body
  const filePath = path.join(baseDirectory, filename)

  try {
    const notesData = await appendChatToFile(
      filePath,
      section,
      question,
      answer
    )
    await fs.writeFile(filePath, JSON.stringify(notesData, null, 2))
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Error reading or writing the file.')
  }
}

export const loadChat = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { sectionNr, chatNr } = req.body

  // Add your logic to read the question from the file based on section and question number
  const filePath = path.join(baseDirectory, filename)

  try {
    // Read and send the question data
    const notesData = await loadchatFromFile(filePath, sectionNr, chatNr)
    res.json(notesData)
  } catch (error) {
    res.status(500).send('Error reading the file or question not found.')
  }
}

export const updateChat = async (req: Request, res: Response) => {
  const { filename } = req.params

  // Parse the request body as INoteEdit
  const noteEdit: IChatEdit = req.body as IChatEdit

  // Extract sectionNr and questionNr from the noteIndex
  const { sectionNr, chatNr } = noteEdit.chatNr

  // Add your logic to read the question from the file based on section and question number
  const filePath = path.join(baseDirectory, filename)

  try {
    await updateChatFromFile(
      filePath,
      sectionNr,
      chatNr,
      noteEdit.chat.question,
      noteEdit.chat.answer
    )
  } catch (error) {
    res.status(500).send('Error editing question.')
  }
}

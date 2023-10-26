import { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { appendData, getQuestionFromJSON } from '../model/dataPreparation'

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

export const getQuestion = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { section, question } = req.body

  // Add your logic to read the question from the file based on section and question number
  const filePath = path.join(baseDirectory, filename)

  try {
    // Read and send the question data
    const notesData = await getQuestionFromJSON(filePath, section, question)
    res.json(notesData)
  } catch (error) {
    res.status(500).send('Error reading the file or question not found.')
  }
}

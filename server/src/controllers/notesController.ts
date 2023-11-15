import { Request, Response } from 'express'
import path from 'path'
import { updateChatFromFile } from '../file/update'
import { IChat, IChatEdit } from 'notes_lib'
import { appendChatToFile } from '../file/append'
import { loadchatFromFile } from '../file/load'

const baseDirectory = 'C:/atari-monk/docs/notes_db'

export const appendChat = async (req: Request, res: Response) => {
  const { filename } = req.params
  const { indexTitle, question, answer, section } = req.body
  const filePath = path.join(baseDirectory, filename)

  const newChat: IChat = {
    indexTitle,
    question,
    answer,
    dateTime: new Date().toISOString(),
  }

  try {
    await appendChatToFile(filePath, section, newChat)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error when appending chat to file:', error)
    res.status(500).send('Error when appending chat to file')
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
      noteEdit.chat.indexTitle,
      noteEdit.chat.question,
      noteEdit.chat.answer
    )
  } catch (error) {
    res.status(500).send('Error editing question.')
  }
}

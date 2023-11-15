import { promises as fs } from 'fs'
import { IChat } from '../types/data/IChat'
import { ISectionsAndChats } from '../types/data/ISectionsAndChats'
import { ISectionAndChats } from '../types/data/ISectionAndChats'

export async function appendChatToFile(
  filePath: string,
  section: string,
  indexTitle: string,
  question: string,
  answer: string
): Promise<ISectionsAndChats> {
  try {
    const newChat: IChat = {
      indexTitle,
      question,
      answer,
      dateTime: new Date().toISOString(),
    }

    const updatedChat = updateChat(await readJson(filePath), section, newChat)

    await writeJson(filePath, updatedChat)

    return updatedChat
  } catch (err) {
    throw err
  }
}

async function readJson(filePath: string): Promise<ISectionsAndChats> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (err) {
    return {
      sections: [],
    }
  }
}

function updateChat(
  existingData: ISectionsAndChats,
  sectionTitle: string,
  newChat: IChat
): ISectionsAndChats {
  const sectionIndex = existingData.sections.findIndex(
    (s) => s.title === sectionTitle
  )

  if (sectionIndex !== -1) {
    existingData.sections[sectionIndex].chats.push(newChat)
  } else {
    const newSectionAndChats: ISectionAndChats = {
      title: sectionTitle,
      chats: [newChat],
    }
    existingData.sections.push(newSectionAndChats)
  }

  return existingData
}

async function writeJson(
  filePath: string,
  data: ISectionsAndChats
): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function loadchatFromFile(
  filePath: string,
  sectionNumber: number,
  questionNumber: number
): Promise<IChat | null> {
  try {
    const allChats = await readJson(filePath)

    if (
      sectionNumber >= 0 &&
      sectionNumber < allChats.sections.length &&
      questionNumber >= 0 &&
      questionNumber < allChats.sections[sectionNumber].chats.length
    ) {
      const sectionAndChats: ISectionAndChats = allChats.sections[sectionNumber]
      const chat: IChat = sectionAndChats.chats[questionNumber]
      return chat
    }

    return null
  } catch (err) {
    throw err
  }
}

export async function updateChatFromFile(
  filePath: string,
  sectionNumber: number,
  chatNumber: number,
  updatedindexTitle: string,
  updatedQuestion: string,
  updatedAnswer: string
): Promise<ISectionsAndChats | null> {
  try {
    const allChats = await readJson(filePath)

    if (
      sectionNumber >= 0 &&
      sectionNumber < allChats.sections.length &&
      chatNumber >= 0 &&
      chatNumber < allChats.sections[sectionNumber].chats.length
    ) {
      const sectionAndChats: ISectionAndChats = allChats.sections[sectionNumber]
      const chat: IChat = sectionAndChats.chats[chatNumber]

      chat.indexTitle = updatedindexTitle
      chat.question = updatedQuestion
      chat.answer = updatedAnswer
      chat.dateTime = new Date().toISOString()

      await writeJson(filePath, allChats)

      return allChats
    }

    return null
  } catch (err) {
    throw err
  }
}

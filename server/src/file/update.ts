import { IChat, ISectionAndChats, ISectionsAndChats } from 'notes_lib'
import { readJson, writeJson } from './fileSys'

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

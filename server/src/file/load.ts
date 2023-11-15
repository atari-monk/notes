import { IChat, ISectionAndChats } from 'notes_lib'
import { readJson } from './fileSys'

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

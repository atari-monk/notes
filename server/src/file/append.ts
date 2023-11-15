import { ISectionsAndChats, IChat, ISectionAndChats } from 'notes_lib'
import { readJson, writeJson } from './fileSys'

export async function appendChatToFile(
  filePath: string,
  section: string,
  newChat: IChat
) {
  const json = await readJson(filePath)
  updateChat(json, section, newChat)
  await writeJson(filePath, json)
}

function updateChat(
  json: ISectionsAndChats,
  sectionTitle: string,
  newChat: IChat
) {
  const sectionIndex = json.sections.findIndex((s) => s.title === sectionTitle)
  if (sectionIndex !== -1) {
    console.log('adding new chat to existing section')
    json.sections[sectionIndex].chats.push(newChat)
  } else {
    console.log('adding new section with new chat')
    json.sections.push({
      title: sectionTitle,
      chats: [newChat],
    } as ISectionAndChats)
  }
}

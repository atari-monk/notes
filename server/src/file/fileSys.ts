import { promises as fs } from 'fs'
import { ISectionsAndChats } from 'notes_lib'

export async function readJson(filePath: string): Promise<ISectionsAndChats> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (err) {
    return {
      sections: [],
    }
  }
}

export async function writeJson(
  filePath: string,
  data: ISectionsAndChats
): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

import { promises as fs } from 'fs'
import { ISectionsAndChats } from 'notes_lib'

export async function readJson(filePath: string): Promise<ISectionsAndChats> {
  try {
    await fs.access(filePath)
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err}`)
    throw err
  }
}

export async function writeJson(
  filePath: string,
  data: ISectionsAndChats
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(`Error writing ${filePath}: ${err}`)
    throw err
  }
}

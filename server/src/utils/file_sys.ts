import fs from 'fs/promises'

export async function ensureFolderExists(folderPath: string): Promise<void> {
  try {
    // Check if the folder exists
    await fs.access(folderPath)
  } catch (error) {
    // If the folder doesn't exist, create it
    await fs.mkdir(folderPath, { recursive: true })
  }
}

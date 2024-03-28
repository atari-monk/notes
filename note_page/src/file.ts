export async function loadJSONFile(filePath: string): Promise<any> {
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error('Failed to fetch JSON file')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading JSON file:', error)
    return null
  }
}

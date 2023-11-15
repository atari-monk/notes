import { appendChatToFile } from 'notes_server'
import { readJson, writeJson } from 'notes_server'

jest.mock('notes_server/file/fileSys', () => ({
  readJson: jest.fn(),
  writeJson: jest.fn(),
}))

describe('appendChatToFile', () => {
  it('appends chat to existing section', async () => {
    const filePath = 'testFilePath'
    const section = 'existingSection'
    const newChat = {
      indexTitle: '1',
      question: 'Q1',
      answer: 'A1',
      dateTime: '2023-01-01',
    }

    const existingJson = {
      sections: [{ title: 'existingSection', chats: [] }],
    }

    // Mock the readJson function to return the existing JSON
    ;(readJson as jest.Mock).mockResolvedValue(existingJson)

    // Call the actual function
    await appendChatToFile(filePath, section, newChat)

    // Check that the writeJson function is called with the expected structure
    expect(writeJson).toHaveBeenCalledWith(
      filePath,
      expect.objectContaining({
        sections: expect.arrayContaining([
          expect.objectContaining({
            title: 'existingSection',
            chats: expect.arrayContaining([newChat]),
          }),
        ]),
      })
    )
  })

  it('appends chat to new section', async () => {
    const filePath = 'testFilePath'
    const section = 'newSection'
    const newChat = {
      indexTitle: '1',
      question: 'Q1',
      answer: 'A1',
      dateTime: '2023-01-01',
    }

    const existingJson = {
      sections: [],
    }

    // Mock the readJson function to return an empty JSON
    ;(readJson as jest.Mock).mockResolvedValue(existingJson)

    // Call the actual function
    await appendChatToFile(filePath, section, newChat)

    // Check that the writeJson function is called with the expected structure
    expect(writeJson).toHaveBeenCalledWith(
      filePath,
      expect.objectContaining({
        sections: expect.arrayContaining([
          expect.objectContaining({
            title: 'newSection',
            chats: expect.arrayContaining([newChat]),
          }),
        ]),
      })
    )
  })
})

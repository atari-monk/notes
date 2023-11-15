import { appendChatToFile } from 'notes_server'
import { readJson, writeJson } from 'notes_server'

jest.mock('notes_server/file/fileSys', () => ({
  readJson: jest.fn(),
  writeJson: jest.fn(),
}))

describe('appendChatToFile', () => {
  describe('when appending to an existing section', () => {
    it('should append the chat to the existing section', async () => {
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

      ;(readJson as jest.Mock).mockResolvedValue(existingJson)

      await appendChatToFile(filePath, section, newChat)

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
  })

  describe('when appending to a new section', () => {
    it('should create a new section and append the chat', async () => {
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

      ;(readJson as jest.Mock).mockResolvedValue(existingJson)

      await appendChatToFile(filePath, section, newChat)

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
})

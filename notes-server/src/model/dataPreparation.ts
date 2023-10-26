import { promises as fs } from 'fs'
import { INote } from './INote'
import { ISection } from './ISection'
import { INotesData } from './INotesData'

export async function appendData(
  filePath: string,
  section: string,
  question: string,
  answer: string
): Promise<INotesData> {
  try {
    const existingData = await readData(filePath)

    const newNote: INote = {
      question,
      answer,
      dateTime: new Date().toISOString(),
    }

    const updatedData = updateData(existingData, section, newNote)

    await writeData(filePath, updatedData)

    return updatedData
  } catch (err) {
    throw err
  }
}

async function readData(filePath: string): Promise<INotesData> {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return {
      sections: [],
    }
  }
}

function updateData(
  existingData: INotesData,
  section: string,
  newNote: INote
): INotesData {
  const sectionIndex = existingData.sections.findIndex(
    (s) => s.title === section
  )

  if (sectionIndex !== -1) {
    existingData.sections[sectionIndex].questions.push(newNote)
  } else {
    const newSection: ISection = {
      title: section,
      questions: [newNote],
    }
    existingData.sections.push(newSection)
  }

  return existingData
}

async function writeData(filePath: string, data: INotesData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function getQuestionFromJSON(
  filePath: string,
  sectionNumber: number,
  questionNumber: number
): Promise<INote | null> {
  try {
    const notesData = await readData(filePath)

    if (
      sectionNumber >= 0 &&
      sectionNumber < notesData.sections.length &&
      questionNumber >= 0 &&
      questionNumber < notesData.sections[sectionNumber].questions.length
    ) {
      const section: ISection = notesData.sections[sectionNumber]
      const question: INote = section.questions[questionNumber]
      return question
    }

    return null // Question or section not found
  } catch (err) {
    throw err
  }
}

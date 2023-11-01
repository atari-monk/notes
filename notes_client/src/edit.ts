import './css/styles.css'
import './css/dark_mode.css'
import { getById } from 'dom-lib'
import { DarkModeToggler } from './DarkModeToggler'
import { INote } from './types/data/INote'
import { INoteData } from './types/data/INoteData'
import { INoteIndex } from './types/data/INoteIndex'
import { INoteEdit } from './types/data/INoteEdit'

let noteIndex: INoteIndex = {
  sectionNr: 0,
  questionNr: 0,
}

async function handleLoad(event: Event) {
  event.preventDefault()

  const fileTitleInput = getById('fileTitle') as HTMLInputElement
  const sectionNumber = getById('sectionNumber') as HTMLInputElement
  const questionNumber = getById('questionNumber') as HTMLInputElement

  const fileTitle = fileTitleInput.value
  const sectionNr = sectionNumber.value
  const questionNr = questionNumber.value

  noteIndex = {
    sectionNr: Number(sectionNr),
    questionNr: Number(questionNr),
  }

  const actionUrl = `http://localhost:3000/notes/getQuestion/${fileTitle}.json`

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteIndex),
    })

    if (response.ok) {
      const questionData = (await response.json()) as INote
      console.log('hello', questionData)
      const sectionInput = document.getElementById(
        'section'
      ) as HTMLInputElement
      const questionInput = document.getElementById(
        'question'
      ) as HTMLInputElement
      const answerInput = document.getElementById(
        'answer'
      ) as HTMLTextAreaElement
      questionInput.value = questionData.question
      answerInput.value = questionData.answer
    } else {
      console.error('Failed to fetch question from the server')
    }
  } catch (error) {
    console.error('An error occurred while fetching the question:', error)
  }
}

async function handleEdit(event: Event) {
  event.preventDefault()

  const fileTitleInput = document.getElementById(
    'fileTitle'
  ) as HTMLInputElement
  const sectionInput = document.getElementById('section') as HTMLInputElement
  const questionInput = document.getElementById('question') as HTMLInputElement
  const answerInput = document.getElementById('answer') as HTMLTextAreaElement

  const fileTitle = fileTitleInput.value
  const section = sectionInput.value
  const question = questionInput.value
  const answer = answerInput.value

  console.log('Data to be sent:', {
    fileTitle,
    section,
    question,
    answer,
  })

  const note: INoteData = {
    fileTitle,
    section,
    question,
    answer,
  }

  const noteEdit: INoteEdit = {
    noteIndex,
    note,
  }

  console.log('noteEdit:', noteEdit)

  const actionUrl = `http://localhost:3000/notes/edit/${fileTitle}.json`

  try {
    const response = await fetch(actionUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteEdit),
    })

    if (response.status === 200) {
      alert('Note submitted successfully!')
      ;(event.target as HTMLFormElement).reset()
    } else {
      alert('Error submitting note.')
    }
  } catch (error: any) {
    alert('Error submitting note: ' + error.message)
  }
}

new DarkModeToggler()
const loadBtn = getById('loadButton')
loadBtn.addEventListener('click', handleLoad)
const editBtn = getById('editButton')
editBtn.addEventListener('click', handleEdit)

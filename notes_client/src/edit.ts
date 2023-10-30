import { getById } from 'dom-lib'
import { DarkModeToggler } from './DarkModeToggler'
import './css/styles.css'

new DarkModeToggler()

const load = getById('loadButton')

export interface INote {
  question: string
  answer: string
  dateTime: string
}

async function handleLoad(event: Event) {
  event.preventDefault()

  const fileTitleInput = getById('fileTitle') as HTMLInputElement
  const sectionNumber = getById('sectionNumber') as HTMLInputElement
  const questionNumber = getById('questionNumber') as HTMLInputElement

  const fileTitle = fileTitleInput.value
  const section = sectionNumber.value
  const question = questionNumber.value

  // Prepare the data to send to the server
  const data = {
    section,
    question,
  }

  const actionUrl = `http://localhost:3000/notes/getQuestion/${fileTitle}.json`

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const questionData = (await response.json()) as INote
      console.log(questionData)
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

load.addEventListener('click', handleLoad)

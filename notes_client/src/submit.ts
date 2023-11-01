import { getById } from 'dom-lib'
import { DarkModeToggler } from './DarkModeToggler'
import { INoteData } from './types/data/INoteData'
import './css/styles.css'

async function handleSubmit(event: Event) {
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

  const actionUrl = `http://localhost:3000/notes/append/${fileTitle}.json`

  const note: INoteData = {
    fileTitle,
    section,
    question,
    answer,
  }

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
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
const form = getById('noteForm') as HTMLFormElement
form.addEventListener('submit', handleSubmit)

import { DarkModeToggler } from './DarkModeToggler'
import { INoteData } from './INoteData'
import './css/styles.css'

new DarkModeToggler()

// Async function to handle form submission
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
    section, // Include section in the data to be sent
    question,
    answer,
  })

  const actionUrl = `http://localhost:3000/notes/append/${fileTitle}.json`

  // Create a note object with section included
  const note: INoteData = {
    fileTitle,
    section, // Include section in the note object
    question,
    answer,
  }

  console.log('Note object:', note)

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

// Get the form element
const form = document.getElementById('noteForm') as HTMLFormElement

// Add a submit event listener to the form
form.addEventListener('submit', handleSubmit)

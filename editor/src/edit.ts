import './css/styles.css'
import './css/dark_mode.css'
import { getById } from 'dom-lib'
import { DarkModeToggler } from './DarkModeToggler'
import { IChat, IFileSectionChatData, ISectionAndChatNr } from 'notes_lib'
import { IChatEdit } from 'notes_lib'

let noteIndex: ISectionAndChatNr = {
  sectionNr: 0,
  chatNr: 0,
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
    chatNr: Number(questionNr),
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
      const questionData = (await response.json()) as IChat
      //   const sectionInput = document.getElementById(
      //     'section'
      //   ) as HTMLInputElement
      const indexTitleInput = document.getElementById(
        'indexTitle'
      ) as HTMLInputElement
      const questionInput = document.getElementById(
        'question'
      ) as HTMLInputElement
      const answerInput = document.getElementById(
        'answer'
      ) as HTMLTextAreaElement
      //sectionInput.value =
      indexTitleInput.value = questionData.indexTitle
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
  const form = (event.currentTarget as HTMLButtonElement).form
  const fileTitleInput = document.getElementById(
    'fileTitle'
  ) as HTMLInputElement
  const sectionInput = document.getElementById('section') as HTMLInputElement
  const indexTitleInput = document.getElementById(
    'indexTitle'
  ) as HTMLInputElement
  const questionInput = document.getElementById('question') as HTMLInputElement
  const answerInput = document.getElementById('answer') as HTMLTextAreaElement

  const fileTitle = fileTitleInput.value
  const section = sectionInput.value
  const indexTitle = indexTitleInput.value
  const question = questionInput.value
  const answer = answerInput.value

  const note: IFileSectionChatData = {
    fileTitle,
    section,
    indexTitle,
    question,
    answer,
  }

  const noteEdit: IChatEdit = {
    chatNr: noteIndex,
    chat: note,
  }

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
      if (form) {
        form.reset()
      }
    } else {
      alert('Error submitting note. No response from server.')
    }
  } catch (error: any) {
    console.log('Error submitting note: ' + error.message)
    alert('Error submitting note: ' + error.message)
  }
}

new DarkModeToggler()
const loadBtn = getById('loadButton')
loadBtn.addEventListener('click', handleLoad)
const editBtn = getById('editButton')
editBtn.addEventListener('click', handleEdit)

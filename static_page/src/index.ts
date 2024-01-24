import './css/styles.css'
import './css/dark_mode.css'
import 'font-awesome/css/font-awesome.min.css'
import { IndexComponent } from './components/IndexComponent'
import { SectionComponent } from './components/SectionComponent'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import implicitFigures from 'markdown-it-implicit-figures'
import { ISectionsAndChats } from 'notes_lib'

//const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement
const darkModeButton = document.getElementById('darkModeButton') as HTMLElement
const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(anchor)
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

darkModeButton.addEventListener('click', toggleDarkMode)

function toggleDarkMode() {
  const body = document.body
  body.classList.toggle('dark-mode')
}

document.addEventListener('DOMContentLoaded', async function (_event) {
  const filePath = '../json/micro_engine_task_2024.json'
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error(`Failed to load JSON file. Status: ${response.status}`)
    }
    const jsonData = await response.json()
    handleFileLoad(jsonData)
  } catch (error: any) {
    console.error('Error loading or parsing JSON file:', error.message)
  }
})

function handleFileLoad(data: ISectionsAndChats) {
  jsonContainer.innerHTML = ''
  index.innerHTML = ''

  const indexComponent = new IndexComponent(index)

  data.sections.forEach((section, sectionIndex) => {
    const sectionComponent = new SectionComponent(
      markDownIt,
      sectionIndex,
      jsonContainer,
      indexComponent
    )
    sectionComponent.createSectionElement(section.title, section.chats)
  })

  highlightCodeBlocks()
  addCopyBtns()
}

function highlightCodeBlocks() {
  document.querySelectorAll('code').forEach((codeBlock) => {
    hljs.highlightElement(codeBlock)
  })
}

function addCopyBtns() {
  const codeBlocks = document.querySelectorAll(
    'pre code[class*="language-"]'
  ) as NodeListOf<HTMLElement>

  codeBlocks.forEach((codeBlock: HTMLElement) => {
    const pre = codeBlock.parentNode
    const container = document.createElement('div')
    container.className = 'code-container'

    const copyButton = document.createElement('button')
    copyButton.className = 'copy-button'

    const copyIcon = document.createElement('i')
    copyIcon.className = 'fa fa-copy'

    copyButton.appendChild(copyIcon)

    copyButton.addEventListener('click', async () => {
      await handleCopyButtonClick(codeBlock)
    })

    container.appendChild(codeBlock)
    container.appendChild(copyButton)
    pre?.appendChild(container)
  })
}

async function handleCopyButtonClick(codeBlock: HTMLElement) {
  const text = codeBlock.textContent || ''

  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

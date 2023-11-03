import './css/styles.css'
import './css/dark_mode.css'
import 'font-awesome/css/font-awesome.min.css'
import { IndexComponent } from './components/IndexComponent'
import { IJsonData } from './model/IJsonData'
import { SectionComponent } from './components/SectionComponent'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement
const darkModeButton = document.getElementById('darkModeButton') as HTMLElement
const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(anchor)

darkModeButton.addEventListener('click', toggleDarkMode)

function toggleDarkMode() {
  const body = document.body
  body.classList.toggle('dark-mode')
}

fileInput.addEventListener('change', function (_event) {
  const file = fileInput.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const jsonData: IJsonData = JSON.parse(event.target?.result as string)
      handleFileLoad(jsonData)
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})

function handleFileLoad(data: IJsonData) {
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

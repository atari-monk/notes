import './css/styles.css'
import './css/dark_mode.css'
import { IndexComponent } from './components/IndexComponent'
import { IJsonData } from './model/IJsonData'
import { SectionComponent } from './components/SectionComponent'
import hljs from 'highlight.js'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement
const darkModeButton = document.getElementById('darkModeButton') as HTMLElement

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
      sectionIndex,
      jsonContainer,
      indexComponent
    )
    sectionComponent.createSectionElement(section.title, section.questions)
  })

  highlightCodeBlocks()
}

function highlightCodeBlocks() {
  document.querySelectorAll('code').forEach((codeBlock) => {
    hljs.highlightElement(codeBlock)
  })
}

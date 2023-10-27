import { IndexComponent } from './components/IndexComponent'
import './css/styles.css'
import { IJsonData } from './model/IJsonData'
import { SectionComponent } from './components/SectionComponent'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement

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
}

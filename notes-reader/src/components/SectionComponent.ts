import { IndexComponent } from './IndexComponent'
import { AnswerCard } from './AnswerCard'

export class SectionComponent {
  private sectionIndex: number
  private jsonContainer: HTMLElement
  private indexComponent: IndexComponent

  constructor(
    sectionIndex: number,
    jsonContainer: HTMLElement,
    indexComponent: IndexComponent
  ) {
    this.sectionIndex = sectionIndex
    this.jsonContainer = jsonContainer
    this.indexComponent = indexComponent
  }

  createSectionElement(
    sectionTitle: string,
    questions: { question: string; answer: string }[]
  ) {
    const sectionDiv = document.createElement('div')
    sectionDiv.id = `section-${this.sectionIndex}`
    sectionDiv.innerHTML = `<h3>${sectionTitle}</h3`

    questions.forEach((item, questionIndex) => {
      const answerCard = new AnswerCard(this.sectionIndex, questionIndex)
      const card = answerCard.createCard(item.question, item.answer)

      sectionDiv.appendChild(card)
    })

    this.indexComponent.addSectionEntry(
      this.sectionIndex,
      sectionTitle,
      questions
    )
    this.jsonContainer.appendChild(sectionDiv)
  }
}

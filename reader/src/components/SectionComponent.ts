import { IndexComponent } from './IndexComponent'
import { AnswerCard } from './AnswerCard'
import MarkdownIt from 'markdown-it'

export class SectionComponent {
  constructor(
    private readonly markdownIt: MarkdownIt,
    private readonly sectionIndex: number,
    private readonly jsonContainer: HTMLElement,
    private readonly indexComponent: IndexComponent
  ) {}

  createSectionElement(
    sectionTitle: string,
    questions: { indexTitle: string, question: string; answer: string }[]
  ) {
    const sectionDiv = document.createElement('div')
    sectionDiv.id = `section-${this.sectionIndex}`
    sectionDiv.innerHTML = this.markdownIt.render(sectionTitle)

    questions.forEach((item, questionIndex) => {
      const answerCard = new AnswerCard(
        this.markdownIt,
        this.sectionIndex,
        questionIndex
      )
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

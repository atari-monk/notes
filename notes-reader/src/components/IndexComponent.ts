export class IndexComponent {
  private index: HTMLElement

  constructor(index: HTMLElement) {
    this.index = index
  }

  createSectionLink(sectionIndex: number, sectionTitle: string): HTMLElement {
    const sectionLink = document.createElement('a')
    sectionLink.textContent = sectionTitle
    sectionLink.href = `#section-${sectionIndex}`
    return sectionLink
  }

  createQuestionLink(
    sectionIndex: number,
    questionIndex: number,
    questionText: string
  ): HTMLElement {
    const questionLink = document.createElement('a')
    questionLink.textContent = questionText
    questionLink.href = `#section-${sectionIndex}-question-${questionIndex}`
    return questionLink
  }

  addSectionEntry(
    sectionIndex: number,
    sectionTitle: string,
    questions: { question: string }[]
  ): void {
    const sectionLink = this.createSectionLink(sectionIndex, sectionTitle)
    const sectionEntry = document.createElement('div')
    sectionEntry.appendChild(sectionLink)
    this.index.appendChild(sectionEntry)

    questions.forEach((item, questionIndex) => {
      const questionLink = this.createQuestionLink(
        sectionIndex,
        questionIndex,
        item.question
      )
      sectionEntry.appendChild(questionLink)
    })
  }
}

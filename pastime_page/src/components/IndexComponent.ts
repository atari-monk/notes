export class IndexComponent {
  private index: HTMLElement

  constructor(index: HTMLElement) {
    this.index = index
  }

  createSectionLink(sectionIndex: number, sectionTitle: string): HTMLElement {
    const sectionLink = document.createElement('a')
    sectionLink.textContent = sectionTitle.replace(/#/g, '')
    sectionLink.href = `#section-${sectionIndex}`
    sectionLink.classList.add('section')
    return sectionLink
  }

  createQuestionLink(
    sectionIndex: number,
    questionIndex: number,
    indexTitle: string
  ): HTMLElement {
    const questionLink = document.createElement('a')
    questionLink.textContent = indexTitle.replace(/#/g, '')
    questionLink.href = `#section-${sectionIndex}-question-${questionIndex}`
    questionLink.classList.add('chat')
    return questionLink
  }

  addSectionEntry(
    sectionIndex: number,
    sectionTitle: string,
    questions: { indexTitle: string }[]
  ): void {
    const sectionLink = this.createSectionLink(sectionIndex, sectionTitle)
    const sectionEntry = document.createElement('div')
    sectionEntry.appendChild(sectionLink)
    this.index.appendChild(sectionEntry)

    questions.forEach((item, questionIndex) => {
      const questionLink = this.createQuestionLink(
        sectionIndex,
        questionIndex,
        item.indexTitle
      )
      sectionEntry.appendChild(questionLink)
    })
  }
}

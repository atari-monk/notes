import MarkdownIt from 'markdown-it'

export class AnswerCard {
  private sectionIndex: number
  private questionIndex: number
  private markdownIt: MarkdownIt

  constructor(sectionIndex: number, questionIndex: number) {
    this.sectionIndex = sectionIndex
    this.questionIndex = questionIndex
    this.markdownIt = new MarkdownIt()
  }

  createCard(question: string, answer: string): HTMLElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<p><strong>Question:</strong> ${question}</p>`
    card.innerHTML += `<p><strong>Answer:</strong></p>`

    card.appendChild(this.createDiv(answer))

    card.id = `section-${this.sectionIndex}-question-${this.questionIndex}`
    return card
  }

  private createDiv(answer: string): Node {
    const div = document.createElement('div')
    div.innerHTML = this.markdownIt.render(answer)
    return div
  }
}

import MarkdownIt from 'markdown-it'

export class AnswerCard {
  constructor(
    private readonly markdownIt: MarkdownIt,
    private readonly sectionIndex: number,
    private readonly questionIndex: number
  ) {}

  createCard(question: string, answer: string): HTMLElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<p><strong>Question:</strong> ${this.markdownIt.render(
      question
    )}</p>`
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

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
    card.innerHTML += `<p>${this.markdownIt.render(question)}</p><hr />`

    card.appendChild(this.createDiv(answer))

    card.id = `section-${this.sectionIndex}-question-${this.questionIndex}`

    card.innerHTML += `<a href="#index" class="index">&#9650;</a>`
    return card
  }

  private createDiv(answer: string): Node {
    const div = document.createElement('div')
    div.innerHTML = this.markdownIt.render(answer)
    return div
  }
}

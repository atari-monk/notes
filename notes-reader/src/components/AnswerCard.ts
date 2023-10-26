import { MultiLineConverter } from '../converter/MultiLineConverter'
import { TextToHTMLConverter } from '../converter/TextToHTMLConverter'

export class AnswerCard {
  private sectionIndex: number
  private questionIndex: number
  private converter: TextToHTMLConverter
  private multiConverter: MultiLineConverter

  constructor(sectionIndex: number, questionIndex: number) {
    this.sectionIndex = sectionIndex
    this.questionIndex = questionIndex
    this.converter = new TextToHTMLConverter()
    this.multiConverter = new MultiLineConverter()
    this.multiConverter.addConverter(/```(.*?)```/gs, (text) => {
      return `<pre class="code-block">${text}</pre>`
    })
  }

  createCard(question: string, answer: string): HTMLElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<p><strong>Question:</strong> ${question}</p>`
    card.innerHTML += `<p><strong>Answer:</strong></p>`

    const answer1 = this.converter.convertTextToHTML(answer)
    //const answer2 = this.multiConverter.convert(answer1)
    const answerDiv = this.createDiv(answer1)
    card.appendChild(answerDiv)

    card.id = `section-${this.sectionIndex}-question-${this.questionIndex}`
    return card
  }

  private createDiv(answer: string): Node {
    const div = document.createElement('div')
    div.innerHTML = answer
    return div
  }
}


//refactor this above test to this converter belov:
this.converters = [
  
  {
    pattern: /^\*\*(.*?)\*\*$/,
    convert: (line) => `<strong>${line.trim().replace(/\*\*/g, '')}</strong>`,
  },
  // Add more converters with patterns and conversion functions as needed
]

//write me ts jest test
//for above converter and class
import { ILineConverter } from './ILineConverter'

export class LineConverter {
  private converters: ILineConverter[]

  constructor() {
    this.converters = []
  }

  addConverter(pattern: RegExp, convertFn: (match: string) => string): void {
    this.converters.push({
      pattern,
      convert: convertFn,
    })
  }

  convertTextToHTML(text: string): string {
    const lines = text.split('\n')
    let html = ''

    lines.forEach((line) => {
      let convertedLine = null

      for (const converter of this.converters) {
        const match = line.match(converter.pattern)
        if (match) {
          convertedLine = converter.convert(match[1])
          break
        }
      }

      if (convertedLine) {
        html += convertedLine
      } else {
        html += `<p>${line}</p>`
      }
    })

    return html
  }
}

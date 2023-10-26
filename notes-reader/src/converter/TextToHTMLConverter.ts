export class TextToHTMLConverter {
  private converters: IConverter[]

  constructor() {
    this.converters = [
      {
        pattern: /^- (.*)$/,
        convert: (line) => `<li>${line.trim().replace(/^- /, '')}</li>`,
      },
      {
        pattern: /^\*\*(.*?)\*\*$/,
        convert: (line) =>
          `<strong>${line.trim().replace(/\*\*/g, '')}</strong>`,
      },
      // Add more converters with patterns and conversion functions as needed
    ]
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

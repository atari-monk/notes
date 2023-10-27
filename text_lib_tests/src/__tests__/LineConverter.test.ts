import { LineConverter } from 'text_lib'

describe('LineConverter', () => {
  let lineConverter: LineConverter

  beforeEach(() => {
    lineConverter = new LineConverter()

    lineConverter.addConverter(
      /^-(.*)$/,
      (line) => `<li>${line.trim().replace(/^- /, '')}</li>`
    )
  })

  it('should convert lines starting with "-" to <li> elements', () => {
    const inputText = '- Item 1\n- Item 2\n- Item 3'
    const expectedHtml = '<li>Item 1</li><li>Item 2</li><li>Item 3</li>'
    const convertedHtml = lineConverter.convertTextToHTML(inputText)

    expect(convertedHtml).toBe(expectedHtml)
  })

  it('should not convert lines that do not match the pattern', () => {
    const inputText = 'This is a regular text line.'
    const expectedHtml = '<p>This is a regular text line.</p>'
    const convertedHtml = lineConverter.convertTextToHTML(inputText)

    expect(convertedHtml).toBe(expectedHtml)
  })
})

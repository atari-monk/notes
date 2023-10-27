import { ULConverter } from 'text_lib'

describe('ULConverter', () => {
  let converter: ULConverter

  beforeEach(() => {
    converter = new ULConverter()
  })

  it('should convert text to a text representation of an HTML ul list', () => {
    const inputText = `
- Item1
- Item2
- Item3
    `

    const ulText = converter.convert(inputText)

    const expectedULText = `<ul><li>Item1</li><li>Item2</li><li>Item3</li></ul>`

    expect(ulText).toBe(expectedULText)
  })

  it('should handle empty input', () => {
    const emptyInput = ''
    const ulText = converter.convert(emptyInput)

    expect(ulText).toBe('')
  })
})

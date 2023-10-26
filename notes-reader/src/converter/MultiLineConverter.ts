export class MultiLineConverter {
  private converters: {
    pattern: RegExp
    convert: (block: string) => string
  }[]

  constructor() {
    this.converters = []
  }

  addConverter(pattern: RegExp, convertFunction: (block: string) => string) {
    this.converters.push({ pattern, convert: convertFunction })
  }

  convert(input: string): string {
    const result: string[] = []
    //let currentBlock: string = ''

    for (const converter of this.converters) {
      const match = input.match(converter.pattern)
      if (match) {
       // result.push(currentBlock)
        result.push(converter.convert(match[0]))
        input = input.replace(converter.pattern, '')
      }
    }

    return result.join('\n')
  }
}

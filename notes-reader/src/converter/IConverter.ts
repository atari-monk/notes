interface IConverter {
  pattern: RegExp
  convert: (line: string) => string
}

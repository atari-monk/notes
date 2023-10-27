export interface ILineConverter {
	pattern: RegExp;
	convert: (line: string) => string;
}

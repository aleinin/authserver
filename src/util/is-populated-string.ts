export const isPopulatedString = (input: unknown): input is string =>
  typeof input === 'string' && input.length > 0

export const isPopulatedStrings = (inputs: any[]): inputs is string[] =>
  inputs.every(isPopulatedString)

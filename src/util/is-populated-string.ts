export const isPopulatedString = (input: unknown): input is string =>
  typeof input === 'string' && input.length > 0

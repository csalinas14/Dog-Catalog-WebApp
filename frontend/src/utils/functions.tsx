export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

//test if string is positive number
export const isNumeric = (value: string) => {
  return /^\d+$/.test(value)
}

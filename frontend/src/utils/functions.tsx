import { AxiosError } from 'axios'

export const getErrorMessage = (error: unknown) => {
  console.log(error)
  if (error instanceof AxiosError) return error.response?.data
  if (error instanceof Error) return error.message
  return String(error)
}

//test if string is positive number
export const isNumeric = (value: string) => {
  return /^\d+$/.test(value)
}

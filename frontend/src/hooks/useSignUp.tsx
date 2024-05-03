import { useCallback, useEffect, useState } from 'react'
import userService from '../services/users'
import { getErrorMessage } from '../utils/functions'
import { NonSensitiveUser } from '../../types'

export const useSignUp = (props: {
  username: string
  password: string
  name: string
}) => {
  const [signedUp, setSignedUp] = useState<NonSensitiveUser>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useCallback(async () => {
    setIsLoading(true)
    try {
      const user = await userService.signUp(props)
      setSignedUp(user)
      setIsLoading(false)
    } catch (error) {
      setError(getErrorMessage(error))
      setIsLoading(false)
    }
  }, [props])

  return { signedUp, isLoading, error }
}

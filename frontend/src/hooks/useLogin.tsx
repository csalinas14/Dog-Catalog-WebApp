import { useCallback, useEffect, useState } from 'react'
import loginService from '../services/login'
import { getErrorMessage } from '../utils/functions'

export const useLogin = (props: { username: string; password: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useCallback(async () => {
    setIsLoading(true)
    try {
      const user = await loginService.login(props)
      window.localStorage.setItem('user', JSON.stringify(user))
      setIsLoading(false)
    } catch (error) {
      setError(getErrorMessage(error))
      setIsLoading(false)
    }
  }, [props])

  return { isLoading, error }
}

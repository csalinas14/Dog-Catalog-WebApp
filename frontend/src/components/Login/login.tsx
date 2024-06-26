import { useState } from 'react'
import loginService from '../../services/login'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getErrorMessage } from '../../utils/functions'
import { useAppDispatch, useAppSelector } from '../../utils/redux_hooks'
import { resetIdle, selectUser, updateUser } from '../../reducers/usersReducer'
import Toast from '../Toast/toast'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)

  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const resultAction = await dispatch(
      updateUser({
        username: email,
        password,
        rememberMe,
      })
    )
    if (updateUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload
      //showToast('success', `Updated ${user.name}`)

      navigate('/?success=true')
      setTimeout(() => {
        dispatch(resetIdle())
      }, 3000)
    } else {
      if (resultAction.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        // Note: this would also be a good place to do any handling that relies on the `rejectedWithValue` payload, such as setting field errors
        //showToast('error', `Update failed: ${resultAction.payload.errorMessage}`)
        setTimeout(() => {
          dispatch(resetIdle())
        }, 3000)
      } else {
        //showToast('error', `Update failed: ${resultAction.error.message}`)
      }
    }
    /*
    setIsLoading(true)
    try {
      const user = await loginService.login({
        username: email,
        password,
        rememberMe,
      })
      if (rememberMe) localStorage.setItem('user', JSON.stringify(user))
      else sessionStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(getErrorMessage(error))
      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setIsLoading(false)
    }
    */
    setEmail('')
    setPassword('')
    setRememberMe(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100'>
      {success === 'true' ? (
        <Toast
          message={'Successfully created account. Please login.'}
          type={'success'}
        />
      ) : (
        <></>
      )}
      {userState.loading === 'failed' ? (
        <Toast message={userState.error} type={'error'} />
      ) : (
        <></>
      )}
      <div className='relative flex flex-col m-6 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <h1 className='mb-3 text-4xl font-bold'>Welcome back</h1>
          <span className='font-light text-gray-400 mb-8'>
            Welcome back! Please enter your details
          </span>
          <form className='py-2 flex flex-col gap-4' onSubmit={handleLogin}>
            <label className='input input-bordered flex items-center gap-2 bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='w-4 h-4 opacity-70'
              >
                <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
              </svg>
              <input
                type='text'
                className='grow'
                placeholder='Email'
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label className='input input-bordered flex items-center gap-2 bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='w-4 h-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                  clipRule='evenodd'
                />
              </svg>
              <input
                type='password'
                className='grow'
                placeholder='Password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
            <div className='flex flex-row place-content-between'>
              <label
                className='cursor-pointer label'
                onChange={() => setRememberMe(!rememberMe)}
              >
                <input
                  type='checkbox'
                  checked={rememberMe}
                  className='checkbox checkbox-info'
                  onKeyDown={(e) => {
                    e.key === 'Enter' && e.preventDefault()
                    if (e.key !== 'Tab') setRememberMe(!rememberMe)
                  }}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className='label-text ml-2'>Remember me</span>
              </label>
              <Link
                to='/signup'
                className='place-content-center label-text link link-info'
              >
                Create Account?
              </Link>
            </div>
            <button className='btn btn-neutral w-full mt-1 text-white'>
              {userState.loading === 'pending' ? (
                <span className='loading loading-spinner loading-md'></span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

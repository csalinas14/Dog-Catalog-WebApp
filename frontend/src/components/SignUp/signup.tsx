import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    console.log('signup request')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100'>
      <div className='relative flex flex-col m-6 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <h1 className='mb-3 text-4xl font-bold text-secondary'>
            Create your account
          </h1>
          <span className='font-light text-gray-400 mb-8'>
            Start your free account today
          </span>
          <form className='py-2 flex flex-col gap-4' onSubmit={handleSignUp}>
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
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
              </svg>
              <input
                type='text'
                className='grow'
                placeholder='Name'
                value={name}
                onChange={({ target }) => setName(target.value)}
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
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </label>
            <div className='flex flex-row'>
              <span className='label-text'>Have an account? </span>
              &nbsp;
              <Link to='/login' className='label-text link link-info'>
                Sign In
              </Link>
            </div>

            <button className='btn btn-neutral w-full mt-1 text-white'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

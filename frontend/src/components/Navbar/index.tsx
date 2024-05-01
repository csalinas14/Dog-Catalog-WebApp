import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../utils/redux_hooks'
import { logout, selectUser } from '../../reducers/usersReducer'

const Navbar = () => {
  const loginMatch = useMatch('/login')
  const signUpMatch = useMatch('/signup')
  const userState = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  //console.log(userState)

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/')
  }

  if (loginMatch || signUpMatch) return
  return (
    <div
      tabIndex={0}
      className='navbar p-0 py-2 flex-row fixed top-0 z-50 w-full border-b-0 shadow-md bg-base-300'
    >
      <div className='navbar-start'>
        <div className='dropdown'>
          <button className='btn btn-square btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
          <ul
            tabIndex={0}
            className='menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/dogs'>Dogs</Link>
            </li>
            <li>
              <Link to='/cats'>Cats</Link>
            </li>
            <li>
              <Link to='/gallery'>Gallery</Link>
            </li>
            {userState.user ? (
              <li>
                <details open>
                  <summary>Account</summary>
                  <ul tabIndex={0}>
                    <li
                      tabIndex={0}
                      role='button'
                      className='justify-between'
                      onClick={() => navigate(`/user/${userState.user?.id}`)}
                    >
                      <a>
                        Profile <span className='badge'>New</span>
                      </a>
                    </li>

                    <li role='button' onClick={handleLogout}>
                      <a tabIndex={0}>Logout</a>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <li>
                <Link to='/login'>Sign In</Link>
              </li>
            )}
          </ul>
        </div>
        <Link
          tabIndex={0}
          className='btn btn-ghost hover:bg-inherit text-xl hidden sm:ml-20 lg:ml-28 lg:flex lg:text-2xl xl:text-5xl'
          to='/'
        >
          Dogs & Cats
        </Link>
      </div>

      <div className='navbar-center lg:hidden '>
        <Link className='btn btn-ghost text-xl' to='/'>
          Dogs & Cats
        </Link>
      </div>

      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 hidden items-center mr-2 lg:flex lg:text-lg lg:px-3 lg:py-0'>
          <li>
            <Link to='/dogs'>Dogs</Link>
          </li>
          <li>
            <Link to='/cats'>Cats</Link>
          </li>
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>
          {userState.user ? (
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar placeholder hover:opacity-80 focus:opacity-80'
              >
                <div className='bg-neutral text-neutral-content w-10 rounded-full cursor-pointer'>
                  <span>{userState.user.name.charAt(0)}</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <a
                    tabIndex={0}
                    role='button'
                    className='justify-between'
                    onClick={() => navigate(`/user/${userState.user?.id}`)}
                  >
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li role='button' onClick={handleLogout}>
                  <a tabIndex={0}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <li>
              <Link to='/login'>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar

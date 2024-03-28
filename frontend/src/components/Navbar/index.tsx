import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar p-0 py-2 flex-row fixed top-0 z-50 w-full border-b-0 shadow-md bg-base-300'>
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
            <li>
              <a>Sign In</a>
            </li>
          </ul>
        </div>
        <Link
          className='btn btn-ghost hover:bg-inherit text-xl hidden sm:pl-20 lg:pl-28 lg:flex lg:text-2xl xl:text-5xl'
          to='/'
        >
          Dogs & Cats
        </Link>
      </div>

      <div className='navbar-center lg:hidden'>
        <Link className='btn btn-ghost text-xl' to='/'>
          Dogs & Cats
        </Link>
      </div>

      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 hidden lg:flex lg:text-lg lg:px-3'>
          <li>
            <Link to='/dogs'>Dogs</Link>
          </li>
          <li>
            <Link to='/cats'>Cats</Link>
          </li>
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>
          <li>
            <a>Sign In</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

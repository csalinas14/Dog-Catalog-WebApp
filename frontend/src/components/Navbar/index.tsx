const Navbar = () => {
  return (
    <div className='navbar'>
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
              <a>Dogs</a>
            </li>
            <li>
              <a>Cats</a>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost text-xl hidden lg:flex'>Pet Catalog</a>
      </div>

      <div className='navbar-center lg:hidden'>
        <a className='btn btn-ghost text-xl'>Dogs & Cats</a>
      </div>

      <div className='navbar-end '>
        <ul className='menu menu-horizontal px-1 hidden lg:flex'>
          <li>
            <a>Dogs</a>
          </li>
          <li>
            <a>Cats</a>
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

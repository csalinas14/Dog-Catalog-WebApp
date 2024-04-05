import { Link } from 'react-router-dom'
import heroDog from '../../../assets/hero-dog-removebg-resize.png'

const Hero = () => {
  return (
    <div className='hero bg-base-200'>
      <div className='hero-content p-0 h-screen flex-row-reverse w-full max-w-full justify-between'>
        <img
          src={heroDog}
          className='hidden p-0 place-self-end sm:flex w-2/5 h-3/4 md:h-4/5 xl:w-1/3'
          alt='Dog'
        />
        <div className='flex flex-col gap-8 p-3 text-center items-center sm:pl-20 md:max-w-[800px] lg:pl-28 lg:pt-10 lg:text-left lg:items-start'>
          <h1 className='text-5xl font-semibold lg:text-5xl lg:font-bold xl:text-6xl'>
            Discover a whole new world of{' '}
            <span className='text-accent'>pets</span>
          </h1>
          <p className='lg:text-lg xl:text-3xl'>
            Interested in learning about pets? Look through our extensive pet
            catalog with all kinds of different dog and cat breeds. Find your
            favorite among all these adorable animals!
          </p>
          <div className='flex flex-row gap-2'>
            <button className='btn btn-accent rounded-2xl lg:text-lg xl:text-3xl xl:items-center xl:h-16'>
              <Link to='/cats'>See Cats</Link>
            </button>
            <button className='btn btn-secondary rounded-2xl lg:text-lg xl:text-3xl xl:items-center xl:h-16'>
              <Link to='/dogs'>See Dogs</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

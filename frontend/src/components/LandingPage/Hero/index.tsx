import heroDog from '../../../assets/hero-dog-removebg-resize.png'

const Hero = () => {
  return (
    <div className='hero bg-base-200'>
      <div className='hero-content p-0 h-screen flex-row-reverse md:max-w-full'>
        <img
          src={heroDog}
          className='hidden w-full p-0 place-self-end  sm:flex'
          alt='Dog'
        />
        <div className='flex flex-col gap-8 p-3 text-center items-center sm:pl-28 md:pl-36'>
          <h1 className='text-5xl font-semibold lg:text-5xl xl:text-6xl'>
            Pet Catalog for Everyone
          </h1>
          <p className='lg:text-lg xl:text-3xl'>
            Interested in learning about pets? Look through our extensive pet
            catalog with all kinds of different dog and cat breeds. Find your
            favorite among all these adorable animals!
          </p>
          <button className='btn btn-accent lg:text-lg xl:text-3xl xl:items-center xl:h-16'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

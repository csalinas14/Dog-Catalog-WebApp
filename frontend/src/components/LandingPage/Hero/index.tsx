import heroDog from '../../../assets/hero-dog.jpg'

const Hero = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col md:flex-row-reverse md:max-w-full'>
        <img
          src={heroDog}
          className='object-scale-down max-h-full md:w-1/2 rounded-lg shadow-2xl m-auto'
          alt='Dog'
        />
        <div className='flex flex-col items-center md:items-start'>
          <h1 className='text-5xl font-bold md:text-left lg:text-7xl xl:text-8xl'>
            Pet Catalog for Everyone
          </h1>
          <p className='py-6 lg:text-lg xl:text-3xl'>
            Interested in learning about pets? Look through our extensive pet
            catalog with all kinds of different dog and cat breeds. Find your
            favorite among all these adorable animals!
          </p>
          <button className='btn btn-primary lg:text-lg xl:text-3xl xl:items-center xl: h-16'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

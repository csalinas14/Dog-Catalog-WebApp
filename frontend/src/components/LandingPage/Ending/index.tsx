import { useNavigate } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'

const LandingPageEnding = ({ variants }: { variants: Variants }) => {
  const navigate = useNavigate()
  const handleRoute = (event: React.SyntheticEvent, path: string) => {
    event.preventDefault()
    navigate(path)
  }

  return (
    <motion.div
      className='bg-base-200'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={variants}>
        <div className='bg-base-200 py-10 mb-10 px-8 sm:px-12 lg:px-28'>
          <hr className='block w-48 h-1 border-0 bg-accent rounded-md mb-8' />
          <h2 className='flex flex-wrap text-xl font-semibold mb-8 lg:text-3xl lg:font-bold xl:text-5xl'>
            Getting
            <span className='text-accent'> &nbsp;started</span>
          </h2>
          <div className='bg-base-100 rounded-lg p-4'>
            <p className='mb-8 lg:text-md xl:text-2xl'>
              Loved what you saw so far? Check out even more below!
            </p>
            <div className='flex flex-wrap gap-2 justify-center lg:justify-start'>
              <button
                className='btn btn-primary lg:text-lg'
                onClick={(event) => handleRoute(event, '/gallery')}
              >
                Check Gallery
              </button>
              <button
                className='btn btn-secondary lg:text-lg'
                onClick={(event) => handleRoute(event, '/dogs')}
              >
                Discover Dogs
              </button>
              <button
                className='btn btn-accent lg:text-lg'
                onClick={(event) => handleRoute(event, '/cats')}
              >
                Find Felines
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LandingPageEnding

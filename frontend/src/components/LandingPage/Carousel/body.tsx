import { motion, Variants } from 'framer-motion'

const CarouselBody = ({ variants }: { variants: Variants }) => {
  return (
    <motion.div
      className='bg-base-200'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={variants}>
        <div className='bg-base-200 px-8 sm:px-12 lg:px-28'>
          <hr className='block w-48 h-1 border-0 bg-accent rounded-md mb-8' />
          <h2 className='flex flex-wrap text-xl font-semibold mb-8 lg:text-3xl lg:font-bold xl:text-5xl'>
            Check out our
            <span className='text-accent'> &nbsp;squad</span>
          </h2>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CarouselBody

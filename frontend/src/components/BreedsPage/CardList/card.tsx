import { Breed } from '../../../../types'
import CatBody from './catBody'
import DogBody from './dogBody'
import { useNavigate } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'

const Card = ({ breed }: { breed: Breed }) => {
  const navigate = useNavigate()
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const BodyType: React.FC<{ breed: Breed }> = ({ breed }) => {
    switch (breed.type) {
      case 'dog':
        return <DogBody breed={breed} />
      case 'cat':
        return <CatBody breed={breed} />
      default:
        return assertNever(breed)
    }
  }

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    navigate(`/breeds/${breed.id}`)
    console.log(breed.id)
  }

  const imageUrl = breed.image ? breed.image.url : undefined

  const divVariants: Variants = {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: {
      y: 50,
      opacity: 1,
      transition: {
        delay: 0.2,
        type: 'spring',
        velocity: 30,
        mass: 0.5,
      },
    },
  }

  return (
    <motion.div
      className='w-full h-full flex flex-col place-items-center'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className='card group cursor-pointer max-w-md w-full h-full bg-base-100 shadow-xl overflow-hidden dark:bg-slate-50 dark:shadow-gray-500 dark:shadow-md'
        onClick={handleClick}
        variants={divVariants}
      >
        <div className='absolute inset-0 bg-center '></div>
        <figure className='h-60 md:h-72 transition duration-300 ease-in-out opacity-85 group-hover:opacity-100'>
          <img
            src={imageUrl}
            alt={breed.type}
            className='animate-fade-in block h-full w-full scale-100 transform object-center opacity-100 transition duration-300 group-hover:scale-125'
          />
        </figure>
        <BodyType breed={breed} />
      </motion.div>
    </motion.div>
  )
}

export default Card

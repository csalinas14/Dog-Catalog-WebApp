import { Breed, Image } from '../../../../types'
import DogBodyBreedInfo from './dogBody'
import CatBodyBreedInfo from './catBody'
import { motion, Variants } from 'framer-motion'

const BreedInfoCard = ({
  breed,
  image,
  variants,
}: {
  breed: Breed
  image: Image | undefined
  variants: Variants
}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const BodyType: React.FC<{ breed: Breed }> = ({ breed }) => {
    switch (breed.type) {
      case 'dog':
        return <DogBodyBreedInfo breed={breed} />
      case 'cat':
        return <CatBodyBreedInfo breed={breed} />
      default:
        return assertNever(breed)
    }
  }

  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={variants}>
        <div className='card bg-base-100 overflow-hidden mt-6 sm:mt-12 lg:grid lg:grid-cols-5'>
          <div className='absolute inset-0 bg-center'></div>
          <figure className='lg:col-span-2'>
            <img
              src={image ? image.url : undefined}
              alt={breed.type}
              className='object-center aspect-square h-full w-full sm:aspect-[3/2]'
            />
          </figure>
          <BodyType breed={breed} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BreedInfoCard

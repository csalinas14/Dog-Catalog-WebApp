import { useMatch } from 'react-router-dom'
import { useBreedInfo } from '../../hooks/useBreedInfo'
import { isString } from '../../../utils'
import { isNumeric } from '../../utils/functions'
import BreedInfoCard from './Card/card'
import BreedInfoGallery from './Gallery'
import BreedInfoSkeleton from './Skeleton/skeleton'
import { motion, Variants } from 'framer-motion'

const BreedPage = () => {
  const breedMatch = useMatch('/breeds/:id')

  const id = breedMatch?.params.id

  let animal = ''
  //dog id is a number while cat id is a 4 letter string so thats how we tell them apart
  if (isString(id) && isNumeric(id)) {
    animal = 'dog'
  } else if (isString(id)) {
    animal = 'cat'
  }

  const { breedInfo, breedImage, breedGallery, isLoading, error } =
    useBreedInfo({
      breed_id: id,
      animal: animal,
    })

  const divVariants: Variants = {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: {
      y: 50,
      opacity: 1,
      transition: {
        delay: 0.3,
        type: 'spring',
        velocity: 30,
        mass: 0.5,
      },
    },
  }

  if (isLoading) {
    return <BreedInfoSkeleton />
  }

  if (error || !breedInfo) return <div>error</div>

  return (
    <div className='w-full px-4 pt-10 sm:px-8 md:px-16 lg:px-8 xl:px-20'>
      <motion.div
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={divVariants}>
          <h1 className='text-center text-4xl font-bold leading-[40px] mt-2 sm:text-left sm:text-5xl sm:leading-[60px] sm:mt-8 sm:mb-4 lg:pl-10 xl:pl-8'>
            {breedInfo.name}
          </h1>
          <h2 className='text-center font-extralight leading-tight mt-1 text-sm text-pretty sm:text-left sm:text-lg  lg:pl-10 xl:pl-8'>
            {breedInfo.temperament}
          </h2>
        </motion.div>
      </motion.div>
      <BreedInfoCard
        breed={breedInfo}
        image={breedImage}
        variants={divVariants}
      />
      <BreedInfoGallery images={breedGallery} variants={divVariants} />
    </div>
  )
}

export default BreedPage

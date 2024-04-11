import { useMatch } from 'react-router-dom'
import { useBreedInfo } from '../../hooks/useBreedInfo'
import { isString } from '../../../utils'
import { isNumeric } from '../../utils/functions'
import BreedInfoCard from './Card/card'
import BreedInfoGallery from './Gallery'
import BreedInfoSkeleton from './Skeleton/skeleton'

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
  if (isLoading) {
    return <BreedInfoSkeleton />
  }
  console.log(breedInfo)
  console.log(breedImage)
  console.log(breedGallery)
  if (error || !breedInfo) return <div>error</div>

  return (
    <div className='w-full px-4 pt-20 sm:px-8 md:px-16 lg:px-8 xl:px-20'>
      <h1 className='text-center text-4xl font-bold leading-[40px] mt-2 sm:text-left sm:text-5xl sm:leading-[60px] sm:mt-8 sm:mb-4 lg:pl-10 xl:pl-8'>
        {breedInfo.name}
      </h1>
      <h2 className='text-center font-extralight leading-tight mt-1 text-sm text-pretty sm:text-left sm:text-lg  lg:pl-10 xl:pl-8'>
        {breedInfo.temperament}
      </h2>
      <BreedInfoCard breed={breedInfo} image={breedImage} />
      <BreedInfoGallery images={breedGallery} />
    </div>
  )
}

export default BreedPage

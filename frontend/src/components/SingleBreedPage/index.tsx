import { useMatch } from 'react-router-dom'
import { useBreedInfo } from '../../hooks/useBreedInfo'
import { isString } from '../../../utils'
import { isNumeric } from '../../utils/functions'
import BreedInfoCard from './Card/card'

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

  const { breedInfo, breedImage, isLoading, error } = useBreedInfo({
    breed_id: id,
    animal: animal,
  })
  console.log(breedInfo)
  console.log(breedImage)
  if (error || !breedInfo) return <div>error</div>

  return (
    <div className='w-full'>
      <BreedInfoCard breed={breedInfo} image={breedImage} />
    </div>
  )
}

export default BreedPage

import { Breed } from '../../../../types'

const DogBodyBreedInfo = ({ breed }: { breed: Breed }) => {
  const test = (breed: Breed) => {
    if ('type' in breed && breed.type === 'dog') {
      return breed
    } else {
      throw new Error('Not the right animal type')
    }
  }
  const breedNarrowed = test(breed)

  return (
    <div className='card-body'>
      <h2 className='card-title'>{breed.name}</h2>
    </div>
  )
}

export default DogBodyBreedInfo

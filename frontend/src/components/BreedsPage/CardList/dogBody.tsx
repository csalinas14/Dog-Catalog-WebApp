import { Breed } from '../../../../types'

const DogBody = ({ breed }: { breed: Breed }) => {
  const test = (breed: Breed) => {
    if ('type' in breed && breed.type === 'dog') {
      return breed
    } else {
      throw new Error('Not the right animal type')
    }
  }
  const breedNarrowed = test(breed)
  return (
    <div className='card-body '>
      <h2 className='card-title'>
        {breed.name}
        <div className='badge badge-secondary'>{breedNarrowed.breed_group}</div>
      </h2>
      <p>{breed.temperament}</p>
      <div className='card-actions justify-start'>
        <div className='badge badge-outline'>{breed.life_span}</div>
        <div className='badge badge-outline'>
          {breedNarrowed.height.imperial} ft
        </div>
        <div className='badge badge-outline'>
          {breedNarrowed.weight.imperial} lbs
        </div>
      </div>
    </div>
  )
}

export default DogBody

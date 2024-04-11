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
    <div className='card-body transition duration-300 ease-in-out group-hover:translate-y-5 group-hover:translate-x-2 group-hover:scale-110'>
      <h2 className='card-title'>
        {breed.name}
        {breedNarrowed.breed_group ? (
          <div className='badge badge-lg badge-secondary'>
            {breedNarrowed.breed_group}
          </div>
        ) : (
          <></>
        )}
      </h2>
      <p className='animate-fade-in transition:flex-grow duration-200 group-hover:flex-grow-[.001]'>
        {breed.temperament}
      </p>
      <div className='card-actions justify-start font-medium'>
        <div className='badge badge-secondary badge-outline'>
          {breed.life_span}
        </div>
        <div className='badge badge-secondary badge-outline'>
          {breedNarrowed.height.imperial} ft
        </div>
        <div className='badge badge-secondary badge-outline'>
          {breedNarrowed.weight.imperial} lbs
        </div>
      </div>
    </div>
  )
}

export default DogBody

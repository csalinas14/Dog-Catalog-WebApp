import { Breed } from '../../../../types'

const CatBody = ({ breed }: { breed: Breed }) => {
  const test = (breed: Breed) => {
    if ('type' in breed && breed.type === 'cat') {
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
        {breedNarrowed.origin ? (
          <div className='badge badge-md badge-primary text-center h-full lg:badge-lg'>
            {breedNarrowed.origin}
          </div>
        ) : (
          <></>
        )}
      </h2>
      <p>{breed.temperament}</p>
      <div className='card-actions justify-start font-semibold'>
        <div className='badge badge-primary badge-outline'>
          {breed.life_span} years
        </div>
        <div className='badge badge-primary badge-outline'>
          {breedNarrowed.weight.imperial} lbs
        </div>
      </div>
    </div>
  )
}

export default CatBody

import { Breed } from '../../../../types'

const CatBodyBreedInfo = ({ breed }: { breed: Breed }) => {
  const test = (breed: Breed) => {
    if ('type' in breed && breed.type === 'cat') {
      return breed
    } else {
      throw new Error('Not the right animal type')
    }
  }
  const breedNarrowed = test(breed)
  return (
    <div className='card-body bg-base-300 p-4'>
      <p className=''>{breedNarrowed.description}</p>
      <p className='text-neutral-500'>
        Weight: {breedNarrowed.weight.imperial} lbs
      </p>
    </div>
  )
}

export default CatBodyBreedInfo

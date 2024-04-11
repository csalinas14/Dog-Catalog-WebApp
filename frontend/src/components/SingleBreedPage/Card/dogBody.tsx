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
    <div className='card-body bg-base-300 p-4 col-span-2 lg:col-span-3'>
      <div className='flex flex-col h-full text-base-content md:text-lg lg:text-2xl justify-between'>
        <p className=' '>Weight: {breedNarrowed.weight.imperial} lbs</p>
        <p className=''>Height: {breedNarrowed.height.imperial} inches</p>
        <p className=''>Life Span: {breedNarrowed.life_span}</p>
        <p className=''>Origin: {breedNarrowed.origin}</p>
        <p>Bred For: {breedNarrowed.bred_for}</p>
        <p>Breed Group: {breedNarrowed.breed_group}</p>
      </div>
    </div>
  )
}

export default DogBodyBreedInfo

import { Breed, Image } from '../../../../types'
import DogBodyBreedInfo from './dogBody'
import CatBodyBreedInfo from './catBody'

const BreedInfoCard = ({
  breed,
  image,
}: {
  breed: Breed
  image: Image | undefined
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
    <div className='card lg:card-side bg-base-100'>
      <div className='absolute inset-0 bg-center '></div>
      <figure className=''>
        <img
          src={image ? image.url : undefined}
          alt={breed.type}
          className='aspect-square'
        />
      </figure>
      <BodyType breed={breed} />
    </div>
  )
}

export default BreedInfoCard

import { Breed } from '../../../../types'
import DogBody from './dogBody'

const Card = ({ breed }: { breed: Breed }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const BodyType: React.FC<{ breed: Breed }> = ({ breed }) => {
    switch (breed.type) {
      case 'dog':
        console.log(breed.breed_group)
        return <DogBody breed={breed} />
      case 'cat':
        return
      default:
        return assertNever(breed)
    }
  }
  return (
    <div className='card w-full bg-base-100 shadow-xl dark:bg-slate-50'>
      <figure>
        <img src={breed.image.url} alt='Pet' />
      </figure>
      <BodyType breed={breed} />
    </div>
  )
}

export default Card

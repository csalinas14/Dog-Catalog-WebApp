import { Breed } from '../../../../types'
import CatBody from './catBody'
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
        return <DogBody breed={breed} />
      case 'cat':
        return <CatBody breed={breed} />
      default:
        return assertNever(breed)
    }
  }
  const imageUrl = breed.image ? breed.image.url : undefined
  return (
    <div className='card max-w-md w-full justify-self-center bg-base-100 shadow-xl dark:bg-slate-50 dark:shadow-gray-500 dark:shadow-md'>
      <figure className='h-60 md:h-72'>
        <img src={imageUrl} alt={breed.type} className='w-full h-full' />
      </figure>
      <BodyType breed={breed} />
    </div>
  )
}

export default Card

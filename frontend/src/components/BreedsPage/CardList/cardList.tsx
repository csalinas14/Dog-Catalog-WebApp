import { Breed } from '../../../../types'
import Card from './card'

const CardList = ({ breeds }: { breeds: Breed[] }) => {
  return (
    <div className='p-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:px-20 pt-20 xl:gap-x-0 gap-y-20'>
      {breeds.map((b) => (
        <Card breed={b} key={b.id} />
      ))}
    </div>
  )
}

export default CardList

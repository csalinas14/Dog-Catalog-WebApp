import { Breed } from '../../../../types'
import Card from './card'

const CardList = ({ breeds }: { breeds: Breed[] }) => {
  return (
    <div className='p-2'>
      {breeds.map((b) => (
        <Card breed={b} key={b.id} />
      ))}
    </div>
  )
}

export default CardList

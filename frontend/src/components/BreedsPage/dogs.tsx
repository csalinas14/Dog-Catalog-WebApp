import { useSearchParams } from 'react-router-dom'
import { useBreeds } from '../../hooks/useBreeds'
import { isNumeric } from '../../utils/functions'
import CardList from './CardList/cardList'

const DogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  let page = searchParams.get('page')
  if (!page || !isNumeric(page)) page = '0'
  const { breedInfo, isLoading, error } = useBreeds({
    animal: 'dog',
    page: page,
  })
  console.log(breedInfo)
  console.log(isLoading)
  console.log(error)
  return (
    <div>
      <CardList breeds={breedInfo} />
    </div>
  )
}

export default DogsPage

import { useSearchParams } from 'react-router-dom'
import { useBreeds } from '../../hooks/useBreeds'
import { isNumeric } from '../../utils/functions'
import CardList from './CardList/cardList'
import Pagination from './Pagination/pagination'
import BreedSkeleton from './Skeleton/skeleton'

const CatsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  let page = searchParams.get('page')
  let pageRequest
  if (!page || !isNumeric(page)) {
    pageRequest = '0'
    page = '1'
  } else pageRequest = (Number(page) - 1).toString()
  const { breedInfo, totalBreeds, isLoading, error } = useBreeds({
    animal: 'cat',
    page: pageRequest,
  })
  //console.log(breedInfo)
  //console.log(totalBreeds)
  //console.log(isLoading)
  //console.log(error)

  //loading skeletons for our cards
  if (isLoading) {
    return <BreedSkeleton />
  }
  return (
    <div className='w-full mt-3 lg:mt-7'>
      <CardList breeds={breedInfo} />
      <Pagination
        page={page}
        totalBreeds={totalBreeds}
        setPage={setSearchParams}
      />
    </div>
  )
}

export default CatsPage

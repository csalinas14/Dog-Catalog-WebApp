import { apiBreedRequestLimit } from '../../../constants'
import { useSearchParams } from 'react-router-dom'

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1]

const Pagination = ({
  page,
  totalBreeds,
  setPage,
}: {
  page: string
  totalBreeds: number
  setPage: SetURLSearchParams
}) => {
  const pageNum = Number(page)
  const lastPage = Math.floor(totalBreeds / apiBreedRequestLimit)
  let pageArray: number[]
  if (pageNum >= lastPage - 1) pageArray = [1, 2, lastPage - 1, lastPage]
  else pageArray = [pageNum, pageNum + 1, lastPage - 1, lastPage]

  const handlePage = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    console.log(newPage)
    setPage({ page: newPage.toString() })
    window.location.reload()
  }

  return (
    <div className='w-full py-10'>
      <div className='join flex place-content-center'>
        <button
          className='join-item btn'
          onClick={(event) => handlePage(event, 1)}
        >
          «
        </button>
        <button
          className={
            'join-item btn' + (pageNum === pageArray[0] ? ' bg-primary' : '')
          }
          onClick={(event) => handlePage(event, pageArray[0])}
        >
          {pageArray[0]}
        </button>
        <button
          className={
            'join-item btn' + (pageNum === pageArray[1] ? ' bg-primary' : '')
          }
          onClick={(event) => handlePage(event, pageArray[1])}
        >
          {pageArray[1]}
        </button>
        <button className='join-item btn btn-disabled'>...</button>
        <button
          className={
            'join-item btn' + (pageNum === pageArray[2] ? ' bg-primary' : '')
          }
          onClick={(event) => handlePage(event, pageArray[2])}
        >
          {pageArray[2]}{' '}
        </button>
        <button
          className={
            'join-item btn' + (pageNum === pageArray[3] ? ' bg-primary' : '')
          }
          onClick={(event) => handlePage(event, pageArray[3])}
        >
          {pageArray[3]}
        </button>
        <button
          className='join-item btn'
          onClick={(event) => handlePage(event, lastPage)}
        >
          »
        </button>
      </div>
    </div>
  )
}

export default Pagination

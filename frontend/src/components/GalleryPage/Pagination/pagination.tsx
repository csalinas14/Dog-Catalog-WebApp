import { useSearchParams } from 'react-router-dom'

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1]

const GalleryPagination = ({
  page,
  type,
  setPage,
}: {
  page: string
  type: string
  setPage: SetURLSearchParams
}) => {
  const pageNum = Number(page)

  const handlePage = (event: React.SyntheticEvent, next: number) => {
    event.preventDefault()
    const newPage = pageNum + next
    setPage({ type, page: newPage.toString() })
    window.location.reload()
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='border-base-300 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4'>
        <div className='join grid grid-cols-2 bg-base-100'>
          <button
            className='join-item btn btn-outline'
            onClick={(event) => handlePage(event, -1)}
          >
            Previous page
          </button>
          <button
            className='join-item btn btn-outline'
            onClick={(event) => handlePage(event, 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default GalleryPagination

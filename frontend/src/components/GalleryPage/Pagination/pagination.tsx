const GalleryPagination = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='border-base-300 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4'>
        <div className='join grid grid-cols-2 bg-base-100'>
          <button className='join-item btn btn-outline'>Previous page</button>
          <button className='join-item btn btn-outline'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default GalleryPagination

const BreedSkeleton = () => {
  return (
    <div className='p-2 grid grid-cols-1 gap-6 mt-3 gap-y-20 pt-20 min-h-screen sm:grid-cols-2 lg:px-20 lg:mt-7 xl:gap-x-0'>
      <div className='flex flex-col justify-self-center gap-4 max-w-md w-full'>
        <div className='skeleton h-60 md:h-72'></div>
        <div className='skeleton h-4 w-28 lg:w-36'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
      <div className='flex flex-col justify-self-center gap-4 max-w-md w-full'>
        <div className='skeleton h-60 md:h-72'></div>
        <div className='skeleton h-4 w-28 lg:w-36'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    </div>
  )
}

export default BreedSkeleton

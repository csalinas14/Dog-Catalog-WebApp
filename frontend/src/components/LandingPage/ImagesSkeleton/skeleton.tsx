const CarouselSkeleton = () => {
  return (
    <div className='p-2 grid grid-cols-1 place-items-center gap-4 sm:grid-cols-3 lg:p-10  xl:gap-x-0'>
      <div className='flex flex-col max-w-md w-full'>
        <div className='skeleton h-60 md:h-72'></div>
      </div>
      <div className='flex flex-col max-w-md w-full'>
        <div className='skeleton h-60 md:h-72'></div>
      </div>
      <div className='flex flex-col max-w-md w-full'>
        <div className='skeleton h-60 md:h-72'></div>
      </div>
    </div>
  )
}

export default CarouselSkeleton

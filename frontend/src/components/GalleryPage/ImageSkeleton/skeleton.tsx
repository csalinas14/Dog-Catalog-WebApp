const GalleryImageSkeleton = () => {
  return (
    <div
      role='tabpanel'
      className='tab-content p-4 gap-4 md:gap-8 columns-1 space-y-4 border-base-300 rounded-box sm:columns-2 md:columns-3 overflow-hidden'
    >
      <div className='max-w-md w-full overflow-hidden'>
        <div className='skeleton aspect-square'></div>
      </div>
      <div className='max-w-md w-full overflow-hidden'>
        <div className='skeleton h-60 md:h-72'></div>
      </div>
      <div className='max-w-md w-full overflow-hidden'>
        <div className='skeleton h-60 md:h-96'></div>
      </div>
    </div>
  )
}

export default GalleryImageSkeleton

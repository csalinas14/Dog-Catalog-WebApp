import { Image, ImageResponse } from '../../../../types'
import GalleryImageSkeleton from '../ImageSkeleton/skeleton'

const GallaryImages = ({ imageResponse }: { imageResponse: ImageResponse }) => {
  const images: Image[] = imageResponse.imageInfo

  if (imageResponse.isLoading || imageResponse.isLoading) {
    return <GalleryImageSkeleton />
  }
  return (
    <div
      role='tabpanel'
      className='tab-content columns-1 p-4 gap-4 border-base-300 rounded-box sm:columns-2 md:columns-3 md:gap-8'
    >
      {images.map((img, i) => (
        <img
          key={img ? img.id : i}
          className='border-1 border-gray-500 rounded-xl mb-8 shadow-md shadow-gray-500'
          src={img ? img.url : undefined}
          alt='Animal'
        />
      ))}
    </div>
  )
}

export default GallaryImages

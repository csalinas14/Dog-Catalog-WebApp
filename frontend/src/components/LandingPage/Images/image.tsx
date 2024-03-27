import { Image, ImageResponse } from '../../../../types'
import CarouselSkeleton from '../ImagesSkeleton/skeleton'

const CarouselImages = ({
  images,
  responses,
}: {
  images: Image[]
  responses: ImageResponse[]
}) => {
  if (responses && (responses[0].isLoading || responses[1].isLoading)) {
    return <CarouselSkeleton />
  }
  return (
    <div className='carousel carousel-center space-x-4 p-4 bg-indigo-100'>
      {images.map((img) => (
        <div
          className='carousel-item w-4/5 md:w-3/5 lg:w-2/5'
          key={img ? img.id : undefined}
        >
          <img
            className='aspect-[3/2] object-fit border-1 border-gray-500 rounded-2xl'
            src={img ? img.url : undefined}
            alt='Animal'
          />
        </div>
      ))}
    </div>
  )
}

export default CarouselImages

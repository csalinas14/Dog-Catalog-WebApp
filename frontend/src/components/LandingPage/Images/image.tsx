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
    <div className='py-20'>
      <div className='bg-base-200 px-8 sm:px-12 lg:px-28'>
        <hr className='block w-48 h-1 border-0 bg-accent rounded-md mb-8' />
        <h2 className='flex flex-wrap text-xl font-semibold mb-8 lg:text-3xl lg:font-bold xl:text-5xl'>
          Check out our
          <span className='text-accent'> &nbsp;squad</span>
        </h2>
        <p className='mb-8 lg:text-md xl:text-2xl'>
          Scroll to check out some lovely pets
        </p>
      </div>
      <div className='carousel carousel-center space-x-4 p-4 bg-accent'>
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
    </div>
  )
}

export default CarouselImages

import { Image, ImageResponse } from '../../../../types'

const CarouselContainer = ({
  images,
}: {
  images: Image[]
  responses: ImageResponse[]
}) => {
  return (
    <div className='carousel space-x-4 p-4 bg-accent '>
      {images.map((img) => (
        <div
          className='carousel-item w-4/5 md:w-3/5 lg:w-2/5'
          key={img ? img.id : undefined}
        >
          <img
            className='aspect-[3/2] object-fit border-1 border-gray-500 rounded-2xl'
            src={img ? img.url : undefined}
            alt='Animal'
            id='test'
          />
        </div>
      ))}
    </div>
  )
}

export default CarouselContainer

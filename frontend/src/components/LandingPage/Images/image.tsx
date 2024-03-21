import { Image } from '../../../../types'

const CarouselImages = ({ images }: { images: Image[] }) => {
  return (
    <div className='carousel carousel-center space-x-4 p-4 bg-indigo-100'>
      {images.map((img) => (
        <div className='carousel-item w-1/3 ' key={img.id}>
          <img
            className='object-fit border-1 border-gray-500 rounded-2xl'
            src={img.url}
            alt='Animal'
          />
        </div>
      ))}
    </div>
  )
}

export default CarouselImages

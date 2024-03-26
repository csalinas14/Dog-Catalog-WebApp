import { Image, ImageResponse } from '../../../../types'

//const GalleryImage = () => {}

const GallaryImages = ({ imageResponse }: { imageResponse: ImageResponse }) => {
  const images: Image[] = imageResponse.imageInfo
  console.log(images)
  return (
    <div className='columns-1 p-4 gap-4 h-full sm:columns-2'>
      {images.map((img) => (
        <img
          className='border-1 border-gray-500 rounded-xl mb-8'
          src={img ? img.url : undefined}
          alt='Animal'
        />
      ))}
    </div>
  )
}

export default GallaryImages
